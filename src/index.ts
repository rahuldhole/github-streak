import { Hono } from 'hono'
import { Bindings, Theme } from './types.ts'
import { fetchGitHubData } from './github.ts'
import { calculateStreakStats } from './logic.ts'
import { renderSVG, renderLandingPage, renderErrorSVG } from './renderer.tsx'

const app = new Hono<{ Bindings: Bindings }>()

// Global type for Cloudflare caches
declare const caches: any

app.all('/', async (c) => {
  const url = new URL(c.req.url)
  const username = url.searchParams.get('user')

  if (!username) {
    c.header('Cache-Control', 'public, max-age=86400, s-maxage=86400')
    const origin = url.origin
    return c.html(renderLandingPage(origin))
  }

  // Cloudflare Cache API: Store the rendered SVG to avoid redundant Worker executions and GitHub API calls.
  // We check for 'caches' existence to remain compatible with Netlify or other runtimes.
  const cache = typeof caches !== 'undefined' ? (caches as any).default : null
  const cacheKey = cache ? new Request(url.toString(), c.req.raw) : null
  
  if (cache && cacheKey) {
    let response = await cache.match(cacheKey)
    if (response) return response
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
    const { days: allDays, totalContributions, contributionYears } = await fetchGitHubData(username, token)
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
    const finalResponse = c.body(svg.toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200'
    })

    // Populate cache asynchronously if supported (Cloudflare)
    if (cache && cacheKey && 'executionCtx' in c && (c as any).executionCtx?.waitUntil) {
      (c as any).executionCtx.waitUntil(cache.put(cacheKey, finalResponse.clone()))
    }
    return finalResponse

  } catch (error: any) {
    const isNotFound = error.message?.includes('not found')
    const errorSvg = renderErrorSVG(isNotFound ? 'User Not Found' : 'GitHub API Error')
    
    return c.body(errorSvg.toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    })
  }
})

export default app
