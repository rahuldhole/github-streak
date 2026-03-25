import { Hono } from 'hono'
import { Bindings, Theme } from './types.ts'
import { fetchGitHubData } from './github.ts'
import { calculateStreakStats } from './logic.ts'
import { renderSVG, renderLandingPage, renderErrorSVG } from './renderer.tsx'

export const app = new Hono<{ Bindings: Bindings }>()

// Global type for Cloudflare caches
declare const caches: any

export const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

// Simple in-memory rate limiter (per-isolate)
const ipRateLimit = new Map<string, { count: number, reset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30

// Global circuit breaker state (per-isolate)
let githubRateLimitRemaining = 5000
let githubRateLimitResetAt = 0

app.all('/', async (c) => {
  const url = new URL(c.req.url)
  const username = url.searchParams.get('user')

  if (!username) {
    c.header('Cache-Control', 'public, max-age=86400, s-maxage=86400')
    c.header('Netlify-CDN-Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
    const origin = url.origin
    return c.html(renderLandingPage(origin))
  }

  // 1. Input Validation
  if (!GITHUB_USERNAME_REGEX.test(username)) {
    return c.body(renderErrorSVG('Invalid Username').toString(), 400, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }

  // 2. IP-based Rate Limiting
  const ip = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown'
  const now = Date.now()
  const userLimit = ipRateLimit.get(ip)

  if (userLimit && now < userLimit.reset) {
    if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
      return c.body(renderErrorSVG('Rate Limit Exceeded').toString(), 429, {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Retry-After': Math.ceil((userLimit.reset - now) / 1000).toString()
      })
    }
    userLimit.count++
  } else {
    ipRateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW })
  }

  // 3. Circuit Breaker (GitHub Token Protection)
  if (githubRateLimitRemaining < 50 && now < githubRateLimitResetAt) {
    return c.body(renderErrorSVG('API Quota Low').toString(), 503, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }

  // Cache API: Store the rendered SVG to avoid redundant executions and GitHub API calls.
  // We check for 'caches' existence and use environment-specific defaults.
  let cache: any = null
  try {
    if (typeof caches !== 'undefined') {
      // Cloudflare uses 'caches.default', while Netlify/Deno standard is 'caches.open'
      cache = (caches as any).default || (await caches.open('streak-cache'))
    }
  } catch (e) {
    console.error('Cache API not available:', e)
  }

  // Construct a normalized URL for the cache key
  const normalizedUrl = new URL(url.origin);
  normalizedUrl.searchParams.set('user', username);
  if (url.searchParams.has('theme')) {
    normalizedUrl.searchParams.set('theme', url.searchParams.get('theme')!);
  }
  if (url.searchParams.has('type')) {
    normalizedUrl.searchParams.set('type', url.searchParams.get('type')!);
  }

  const cacheKey = cache ? new Request(normalizedUrl.toString(), c.req.raw) : null;

  if (cache && cacheKey) {
    let response = await cache.match(cacheKey);
    if (response) {
      const age = response.headers.get('Age');
      // If the cached item is older than 1 hour (3600s), ignore it and fetch fresh
      if (age && parseInt(age) < 3600) {
        const cachedResponse = new Response(response.body, response);
        cachedResponse.headers.set('X-Cache', 'HIT');
        return cachedResponse;
      }
    }
  }

  const token = c.env.GITHUB_TOKEN
  if (!token) {
    const errorSvg = renderErrorSVG('Config Error')
    return c.body(errorSvg.toString(), 500, {
      'Content-Type': 'image/svg+xml'
    })
  }

  const theme = (url.searchParams.get('theme') || 'transparent') as Theme

  try {
    const { days: allDays, totalContributions, contributionYears, rateLimit } = await fetchGitHubData(username, token)
    
    // Update circuit breaker state
    if (rateLimit) {
      githubRateLimitRemaining = rateLimit.remaining
      githubRateLimitResetAt = new Date(rateLimit.resetAt).getTime()
    }

    const stats = calculateStreakStats(allDays, totalContributions, contributionYears)
    const last7 = allDays.slice(-7)
    const maxCount = Math.max(...last7.map(d => d.contributionCount), 1)

    const type = url.searchParams.get('type')

    if (type === 'json') {
      return c.json({
        username,
        stats,
        last7,
        maxCount,
        theme
      })
    }

    const svg = renderSVG(stats, last7, maxCount, theme)
    
    // Set headers for Netlify and other CDNs
    // stale-while-revalidate=604800 (1 week) allows serving slightly stale content while fetching fresh data in the background.
    const headers = {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' 
    };

    const finalResponse = c.body(svg.toString(), 200, headers)

    // Populate the Cache API asynchronously (Cloudflare Workers).
    // On Netlify Edge Functions, context.waitUntil() attempts an internal filesystem write
    // that Deno's sandboxed runtime blocks. The cache write is a best-effort optimisation.
    // Netlify's CDN handles caching via the Netlify-CDN-Cache-Control header.
    const executionCtx = (c as any).executionCtx
    if (cache && cacheKey && executionCtx?.waitUntil) {
      executionCtx.waitUntil(
        cache.put(cacheKey, finalResponse.clone()).catch((cacheErr: any) => {
          console.warn('Cache write skipped:', cacheErr.message)
        })
      )
    }
    return finalResponse

  } catch (error: any) {
    const isNotFound = error.message?.includes('not found')
    const isRateLimit = error.message?.includes('Rate Limit') || error.message?.includes('429')
    
    const status = isNotFound ? 404 : (isRateLimit ? 429 : 503)
    const message = isNotFound ? 'User Not Found' : (isRateLimit ? 'API Rate Limit' : 'GitHub API Error')
    const errorSvg = renderErrorSVG(message)
    
    return c.body(errorSvg.toString(), status, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }
})

export default app
