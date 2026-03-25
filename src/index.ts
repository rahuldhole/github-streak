import { Hono } from 'hono'
import { getStore } from '@netlify/blobs'
import { Bindings, Theme } from './types.ts'
import { fetchGitHubData } from './github.ts'
import { calculateStreakStats } from './logic.ts'
import { renderSVG, renderLandingPage, renderErrorSVG } from './renderer.tsx'

export const app = new Hono<{ Bindings: Bindings }>()

export const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i

const ipRateLimit = new Map<string, { count: number, reset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 
const MAX_REQUESTS_PER_WINDOW = 30

let githubRateLimitRemaining = 5000
let githubRateLimitResetAt = 0

// Global error handler
app.onError((err, c) => {
  console.error('App Error:', err)
  const message = err.message || 'Internal Server Error'
  
  if (c.req.query('user') !== undefined) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG(message).toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    })
  }
  
  const status = (err as any).status || 500
  c.header('Vary', 'Accept')
  return c.html(`<h1>Error: ${message}</h1>`, status)
})

app.notFound((c) => {
  if (c.req.query('user') !== undefined) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG('Path Not Found').toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }
  
  c.header('Vary', 'Accept')
  return c.html('<h1>404 Not Found</h1>', 404)
})

app.all('*', async (c) => {
  const url = new URL(c.req.url)

  if (c.req.path === '/sample.svg') {
    const mockStats = { 
      current: { count: 42, start: '2024-01-01', end: '2024-02-12' }, 
      max: { count: 99, start: '2023-05-10', end: '2023-08-17' }, 
      total: 1337,
      yearRange: '2015 - 2024'
    }
    const mockLast7 = [
      { contributionCount: 4, date: '2024-03-01' },
      { contributionCount: 10, date: '2024-03-02' },
      { contributionCount: 2, date: '2024-03-03' },
      { contributionCount: 8, date: '2024-03-04' },
      { contributionCount: 5, date: '2024-03-05' },
      { contributionCount: 7, date: '2024-03-06' },
      { contributionCount: 3, date: '2024-03-07' }
    ]
    const svg = renderSVG(mockStats as any, mockLast7 as any, 10, (c.req.query('theme') || 'dark') as Theme, 'Sample Data')
    c.header('Vary', 'Accept')
    return c.body(svg.toString(), 200, { 
      'Content-Type': 'image/svg+xml', 
      'Cache-Control': 'no-store, no-cache, must-revalidate' 
    })
  }

  const queryUser = c.req.query('user');

  if (queryUser === undefined) {
    if (c.req.path === '/' || c.req.path === '') {
      c.header('Vary', 'Accept')
      c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
      c.header('Netlify-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600')
      return c.html(renderLandingPage(url.origin))
    }
    c.header('Vary', 'Accept')
    return c.notFound()
  }

  const username = queryUser.trim()
  const theme = (c.req.query('theme') || 'transparent') as Theme
  const type = c.req.query('type')

  if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG('Invalid Username').toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }

  // Rate limiting (in-memory)
  const ip = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown'
  const now = Date.now()
  const userLimit = ipRateLimit.get(ip)
  if (userLimit && now < userLimit.reset) {
    if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
      c.header('Vary', 'Accept')
      return c.body(renderErrorSVG('Rate Limit Exceeded').toString(), 200, {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      })
    }
    userLimit.count++
  } else {
    ipRateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW })
  }

  // NETLIFY BLOBS CACHING
  const streakStore = getStore('streak-data')
  let cachedData: any = null
  
  try {
    if (!c.req.query('no-cache')) {
      cachedData = await streakStore.get(username, { type: 'json' })
    }
  } catch (e) {
    console.error('Blob fetch failed:', e)
  }

  let finalData = cachedData
  let lastUpdated = cachedData?.timestamp ? new Date(cachedData.timestamp).toLocaleTimeString() : undefined

  // Re-fetch if no cache or cache older than 1 hour
  const isStale = !cachedData || (Date.now() - cachedData.timestamp > 3600000)

  if (isStale || c.req.query('no-cache')) {
    const token = c.env.GITHUB_TOKEN
    if (!token) {
      return c.body(renderErrorSVG('Config Error').toString(), 200, {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store'
      })
    }

    try {
      const { days, totalContributions, contributionYears, rateLimit } = await fetchGitHubData(username, token)
      
      if (rateLimit) {
        githubRateLimitRemaining = rateLimit.remaining
        githubRateLimitResetAt = new Date(rateLimit.resetAt).getTime()
      }

      const stats = calculateStreakStats(days, totalContributions, contributionYears)
      const last7 = days.slice(-7)
      const maxCount = Math.max(...last7.map(d => d.contributionCount), 1)

      finalData = { stats, last7, maxCount, timestamp: Date.now() }
      lastUpdated = new Date(finalData.timestamp).toLocaleTimeString()

      // Async write to blobs
      const executionCtx = (c as any).executionCtx
      if (executionCtx?.waitUntil) {
        executionCtx.waitUntil(streakStore.setJSON(username, finalData).catch(() => {}))
      } else {
        await streakStore.setJSON(username, finalData).catch(() => {})
      }
    } catch (error: any) {
      if (cachedData) {
        // Fallback to stale data on error
        finalData = cachedData
      } else {
        const isNotFound = error.message?.includes('not found')
        return c.body(renderErrorSVG(isNotFound ? 'User Not Found' : 'GitHub API Error').toString(), 200, {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-store'
        })
      }
    }
  }

  if (type === 'json') {
    c.header('Vary', 'Accept')
    return c.json({ username, ...finalData, theme })
  }

  const svg = renderSVG(finalData.stats, finalData.last7, finalData.maxCount, theme, lastUpdated)
  return c.body(svg.toString(), 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Vary': 'Accept',
    'X-Cache': isStale ? 'MISS' : 'HIT'
  })
})

export default app