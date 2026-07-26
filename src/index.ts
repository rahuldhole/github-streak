import { Hono } from 'hono'
import { getStore } from '@netlify/blobs'
import { Bindings, Theme } from './types.ts'
import { fetchGitHubData } from './github.ts'
import { calculateStreakStats } from './logic.ts'
import { renderSVG, renderLandingPage, renderErrorSVG, renderProfilePage, renderProfileSVG } from './renderer.tsx'
import { logEvent, GITHUB_USERNAME_REGEX, getSafeErrorMessage } from './utils.ts'
import pkg from '../package.json' with { type: 'json' }

const cacheStoreVersion = pkg.cacheStoreVersion

export const app = new Hono<{ Bindings: Bindings }>()

const ipRateLimit = new Map<string, { count: number, reset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 
const MAX_REQUESTS_PER_WINDOW = 30

let githubRateLimitRemaining = 5000
let githubRateLimitResetAt = 0

// Global error handler
app.onError((err, c) => {
  logEvent({ name: 'error', data: { type: 'app_error', error: err.toString() } })
  const safeMessage = getSafeErrorMessage(err)
  logEvent({ name: 'error', data: { message: safeMessage } })
  
  if (c.req.query('user') !== undefined) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG(safeMessage).toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    })
  }
  const status = (err as any).status || 500
  c.header('Vary', 'Accept')
  return c.html(`<h1>Error: ${safeMessage}</h1>`, status)
})

app.notFound((c) => {
  logEvent({ name: 'not_found', data: { path: c.req.path } })
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

  let queryUser = c.req.query('user');
  let pathTheme: string | undefined;
  let isProfileSVG = false;
  let isProfilePage = false;

  if (c.req.path.startsWith('/profile-svg/')) {
    queryUser = c.req.path.split('/profile-svg/')[1];
    isProfileSVG = true;
  } else if (c.req.path.startsWith('/profile/')) {
    const profilePath = c.req.path.split('/profile/')[1];
    const parts = profilePath.split('/');
    if (parts.length > 1) {
      queryUser = parts[0];
      pathTheme = parts[1];
    } else {
      queryUser = parts[0];
    }
    isProfilePage = true;
  }

  if (queryUser === undefined) {
    if (c.req.path === '/' || c.req.path === '') {
      logEvent({ name: 'page_view', data: { page: 'landing' } })
      c.header('Vary', 'Accept')
      c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
      c.header('Netlify-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600')
      return c.html(renderLandingPage(url.origin))
    }
    c.header('Vary', 'Accept')
    return c.notFound()
  }

  const username = queryUser.split('?')[0].trim()
  const theme = (pathTheme || c.req.query('theme') || 'transparent') as Theme
  const type = c.req.query('type')
  const forceRefresh = c.req.query('no-cache') === 'true'
  const fullRefresh = c.req.query('full-refresh') === 'true'

  if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG('Invalid Username').toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }

  const ip = c.req.header('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const userLimit = ipRateLimit.get(ip)
  let isIpRateLimited = false

  if (userLimit && now < userLimit.reset) {
    if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
      isIpRateLimited = true
      logEvent({ name: 'rate_limited', data: { type: 'ip' } })
    } else {
      userLimit.count++
    }
  } else {
    ipRateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW })
  }

  const streakStore = getStore('streak-data')
  const historyKey = `${username}:history`
  const currentKey = `${username}:current`
  const currentYear = new Date().getFullYear()

  let historyBlob: any = null
  let currentBlob: any = null
  
  try {
    historyBlob = await streakStore.get(historyKey, { type: 'json' })
    currentBlob = await streakStore.get(currentKey, { type: 'json' })
  } catch (e) {
    logEvent({ name: 'error', data: { type: 'blob_fetch_failed', error: (e as any).toString() } })
  }

  const storedVersion = Number(currentBlob?.cacheVersion || 0)
  const activeVersion = Number(cacheStoreVersion || 0)
  const isVersionStale = storedVersion < activeVersion

  const historyStoredVersion = Number(historyBlob?.cacheVersion || 0)
  const isHistoryVersionStale = historyStoredVersion < activeVersion
  const isHistoryStale = isHistoryVersionStale || !historyBlob || (Date.now() - (historyBlob.timestamp || 0) > 30 * 24 * 60 * 60 * 1000)

  const isCurrentStale = isVersionStale || !currentBlob || (Date.now() - currentBlob.timestamp > 3600000)
  
  // High-Level Availability Guard
  // Only proceed to GitHub fetch if NOT rate-limited AND NOT quota-exhausted
  if ((isCurrentStale || forceRefresh || fullRefresh || isHistoryStale) && !isIpRateLimited) {
    const token = c.env.GITHUB_TOKEN
    if (!token) return c.body(renderErrorSVG('Config Error').toString(), 200, { 'Content-Type': 'image/svg+xml' });

    // Quota Guard: If we are critically low on GitHub quota (or exhausted), strictly serve stale data
    const isQuotaExhausted = githubRateLimitRemaining === 0 && Date.now() < githubRateLimitResetAt
    if ((githubRateLimitRemaining < 20 || isQuotaExhausted) && currentBlob) {
        logEvent({ name: 'warn_quota_low', data: { username } })
    } else {
        try {
      // TIERED FETCH: If we have history AND the version is current AND not older than a month, only do a partial fetch
      const partialFetch = (!isHistoryStale && !fullRefresh) ? true : false
      const fresh = await fetchGitHubData(username, token, partialFetch)
      
      if (fresh.rateLimit) {
        githubRateLimitRemaining = fresh.rateLimit.remaining
        githubRateLimitResetAt = new Date(fresh.rateLimit.resetAt).getTime()
      }

      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0]

      const recentTotal = fresh.days
        .filter(d => d.date >= sixMonthsAgoStr)
        .reduce((sum, d) => sum + d.contributionCount, 0)

      // If we did a full fetch, calculate and update history
      if (!partialFetch) {
        const histTotal = fresh.totalContributions - recentTotal
        historyBlob = { 
          total: histTotal, 
          years: fresh.contributionYears.filter(y => y !== currentYear),
          cacheVersion: activeVersion,
          timestamp: Date.now()
        }
        await streakStore.setJSON(historyKey, historyBlob).catch(() => {})
      }

      const stats = calculateStreakStats(fresh.days, recentTotal, fresh.contributionYears)
      const last7 = fresh.days.slice(-7)
      const maxCount = Math.max(...last7.map(d => d.contributionCount), 1)

      currentBlob = { 
        stats, 
        last7, 
        maxCount, 
        name: fresh.name,
        avatarUrl: fresh.avatarUrl,
        bio: fresh.bio,
        company: fresh.company,
        location: fresh.location,
        websiteUrl: fresh.websiteUrl,
        twitterUsername: fresh.twitterUsername,
        email: fresh.email,
        followers: fresh.followers,
        following: fresh.following,
        repositories: fresh.repositories,
        pinnedItems: fresh.pinnedItems,
        timestamp: Date.now(), 
        cacheVersion: activeVersion 
      }
      await streakStore.setJSON(currentKey, currentBlob).catch(() => {})
        } catch (error: any) {
          if (currentBlob) {
            // Fallback to stale data
          } else {
            return c.body(renderErrorSVG(getSafeErrorMessage(error)).toString(), 200, { 'Content-Type': 'image/svg+xml' });
          }
        }
    }
  }

  // Final validation before rendering: If we were rate-limited and still have no data, return error
  if (!currentBlob) {
    c.header('Vary', 'Accept')
    const errorMsg = isIpRateLimited ? 'Rate Limit Exceeded' : 'Data Not Available'
    return c.body(renderErrorSVG(errorMsg).toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    })
  }

  // Final Aggregation: Combine cached history with current data
  // Even if we fetched 'fresh', the fresh.totalContributions is already correct in currentBlob.stats.total
  // But if history exists, we should ensure the combined total reflects both.
  // Actually, if we fetch 'onlyCurrent', fresh.totalContributions IS the total for the current calendar (last 365 days).
  // So we merge: history.total + currentBlob.stats.total
  const aggregatedTotal = (historyBlob?.total || 0) + currentBlob.stats.total
  const lastUpdated = new Date(currentBlob.timestamp).toLocaleTimeString()

  if (type === 'json') {
    c.header('Vary', 'Accept')
    logEvent({ name: 'api_request', data: { username, theme } })
    return c.json({ username, ...currentBlob, total: aggregatedTotal, theme })
  }

  if (isProfilePage) {
    logEvent({ name: 'page_view', data: { page: 'profile', username } })
    c.header('Vary', 'Accept')
    c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    const profileData = { ...currentBlob, total: aggregatedTotal }
    return c.html(renderProfilePage(url.origin, username, theme, profileData))
  }

  if (isProfileSVG) {
    logEvent({ name: 'profile_svg_rendered', data: { username, theme, cacheHit: !isCurrentStale } })
    const svg = renderProfileSVG(
      username, 
      currentBlob.name,
      currentBlob.avatarUrl,
      { ...currentBlob.stats, total: aggregatedTotal }, 
      currentBlob.last7, 
      currentBlob.maxCount, 
      theme, 
      lastUpdated
    )
    return c.body(svg.toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Vary': 'Accept',
      'X-Cache': isCurrentStale ? 'MISS' : 'HIT'
    })
  }

  logEvent({ name: 'svg_rendered', data: { username, theme, cacheHit: !isCurrentStale } })
  const svg = renderSVG({ ...currentBlob.stats, total: aggregatedTotal }, currentBlob.last7, currentBlob.maxCount, theme, lastUpdated)
  return c.body(svg.toString(), 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Vary': 'Accept',
    'X-Cache': isCurrentStale ? 'MISS' : 'HIT'
  })
})

export default app