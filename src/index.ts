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
  
  if (c.req.query('user') !== undefined || c.req.path.startsWith('/profile-svg/')) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG(safeMessage).toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    })
  }
  const status = (err as any).status || 500
  c.header('Vary', 'Accept')
  return c.html(`<h1>Error: ${safeMessage}</h1>`, status)
})

app.notFound((c) => {
  logEvent({ name: 'not_found', data: { path: c.req.path } })
  if (c.req.query('user') !== undefined || c.req.path.startsWith('/profile-svg/')) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG('Path Not Found').toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    })
  }
  c.header('Vary', 'Accept')
  return c.html('<h1>404 Not Found</h1>', 404)
})

async function refreshUserData(
  c: any, 
  username: string, 
  historyKey: string, 
  currentKey: string, 
  activeVersion: number, 
  isHistoryStale: boolean, 
  fullRefresh: boolean,
  needsProfileData: boolean = true,
  existingCurrentBlob?: any
) {
  const token = c.env.GITHUB_TOKEN
  if (!token) throw new Error('Config Error');
  const currentYear = new Date().getFullYear()

  const partialFetch = (!isHistoryStale && !fullRefresh) ? true : false
  const fresh = await fetchGitHubData(username, token, partialFetch, needsProfileData)
  
  if (fresh.rateLimit) {
    githubRateLimitRemaining = fresh.rateLimit.remaining
    githubRateLimitResetAt = new Date(fresh.rateLimit.resetAt).getTime()
  }

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0]

  const recentTotal = fresh.days
    .filter((d: any) => d.date >= sixMonthsAgoStr)
    .reduce((sum: number, d: any) => sum + d.contributionCount, 0)

  let newHistoryBlob: any = null
  if (!partialFetch) {
    const histTotal = fresh.totalContributions - recentTotal
    newHistoryBlob = { 
      total: histTotal, 
      years: fresh.contributionYears.filter((y: number) => y !== currentYear),
      cacheVersion: activeVersion,
      timestamp: Date.now()
    }
  }

  const stats = calculateStreakStats(fresh.days, recentTotal, fresh.contributionYears)
  const last7 = fresh.days.slice(-7)
  const maxCount = Math.max(...last7.map((d: any) => d.contributionCount), 1)

  const newCurrentBlob = { 
    stats, 
    last7, 
    maxCount, 
    name: fresh.name !== undefined ? fresh.name : existingCurrentBlob?.name,
    avatarUrl: fresh.avatarUrl !== undefined ? fresh.avatarUrl : existingCurrentBlob?.avatarUrl,
    bio: fresh.bio !== undefined ? fresh.bio : existingCurrentBlob?.bio,
    company: fresh.company !== undefined ? fresh.company : existingCurrentBlob?.company,
    location: fresh.location !== undefined ? fresh.location : existingCurrentBlob?.location,
    websiteUrl: fresh.websiteUrl !== undefined ? fresh.websiteUrl : existingCurrentBlob?.websiteUrl,
    twitterUsername: fresh.twitterUsername !== undefined ? fresh.twitterUsername : existingCurrentBlob?.twitterUsername,
    email: fresh.email !== undefined ? fresh.email : existingCurrentBlob?.email,
    followers: fresh.followers !== undefined ? fresh.followers : existingCurrentBlob?.followers,
    following: fresh.following !== undefined ? fresh.following : existingCurrentBlob?.following,
    repositories: fresh.repositories !== undefined ? fresh.repositories : existingCurrentBlob?.repositories,
    pinnedItems: fresh.pinnedItems !== undefined ? fresh.pinnedItems : existingCurrentBlob?.pinnedItems,
    timestamp: Date.now(), 
    cacheVersion: activeVersion 
  }
  
  const streakStore = getStore('streak-data')
  await Promise.all([
    newHistoryBlob ? streakStore.setJSON(historyKey, newHistoryBlob) : Promise.resolve(),
    streakStore.setJSON(currentKey, newCurrentBlob)
  ]).catch(() => {})

  return { newCurrentBlob, newHistoryBlob }
}

// Extract the data fetch logic
async function getStreakData(c: any, queryUser: string, forceRefresh: boolean, fullRefresh: boolean, needsProfileData: boolean = true) {
  const username = queryUser.split('?')[0].trim()
  
  if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
    return { error: 'Invalid Username' }
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

  // Parallelize Netlify Blob Reads
  const [historyBlob, currentBlob] = await Promise.all([
    streakStore.get(historyKey, { type: 'json' }).catch(() => null),
    streakStore.get(currentKey, { type: 'json' }).catch(() => null)
  ]) as [any, any];

  const storedVersion = Number(currentBlob?.cacheVersion || 0)
  const activeVersion = Number(cacheStoreVersion || 0)
  const isVersionStale = storedVersion < activeVersion

  const historyStoredVersion = Number(historyBlob?.cacheVersion || 0)
  const isHistoryVersionStale = historyStoredVersion < activeVersion
  const isHistoryStale = isHistoryVersionStale || !historyBlob || (Date.now() - (historyBlob.timestamp || 0) > 30 * 24 * 60 * 60 * 1000)

  const isCurrentStale = isVersionStale || !currentBlob || (Date.now() - currentBlob.timestamp > 3600000)
  
  let newHistoryBlob = historyBlob;
  let newCurrentBlob = currentBlob;

  const isProfileDataMissing = needsProfileData && currentBlob && !currentBlob.avatarUrl;

  if ((isCurrentStale || forceRefresh || fullRefresh || isHistoryStale || isProfileDataMissing) && !isIpRateLimited) {
    const isQuotaExhausted = githubRateLimitRemaining === 0 && Date.now() < githubRateLimitResetAt
    if ((githubRateLimitRemaining < 20 || isQuotaExhausted) && newCurrentBlob) {
        logEvent({ name: 'warn_quota_low', data: { username } })
    } else {
        if (newCurrentBlob && !forceRefresh && !fullRefresh && !isProfileDataMissing) {
            // Background SWR execution
            let waitUntilFn: ((promise: Promise<any>) => void) | undefined
            try {
                if (c.executionCtx && c.executionCtx.waitUntil) {
                    waitUntilFn = c.executionCtx.waitUntil.bind(c.executionCtx)
                }
            } catch (e) {
                // Ignore missing executionCtx
            }

            if (waitUntilFn) {
                waitUntilFn(
                    refreshUserData(c, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob).catch((err: any) => {
                      logEvent({ name: 'error', data: { type: 'background_refresh_failed', username, error: getSafeErrorMessage(err) } })
                    })
                )
            } else {
                refreshUserData(c, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob).catch((err: any) => {
                  logEvent({ name: 'error', data: { type: 'background_refresh_failed', username, error: getSafeErrorMessage(err) } })
                })
            }
        } else {
            // Synchronous cold start fetch
            try {
                const refreshed = await refreshUserData(c, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob)
                newCurrentBlob = refreshed.newCurrentBlob
                if (refreshed.newHistoryBlob) newHistoryBlob = refreshed.newHistoryBlob
            } catch (error: any) {
                if (!newCurrentBlob) {
                    return { error: getSafeErrorMessage(error) };
                }
            }
        }
    }
  }

  if (!newCurrentBlob) {
    const errorMsg = isIpRateLimited ? 'Rate Limit Exceeded' : 'Data Not Available'
    return { error: errorMsg }
  }

  const aggregatedTotal = (newHistoryBlob?.total || 0) + newCurrentBlob.stats.total
  const lastUpdated = new Date(newCurrentBlob.timestamp).toLocaleTimeString()

  return {
    username,
    currentBlob: newCurrentBlob,
    aggregatedTotal,
    lastUpdated,
    isCurrentStale
  }
}

function returnErrorSVG(c: any, msg: string) {
  c.header('Vary', 'Accept')
  return c.body(renderErrorSVG(msg).toString(), 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  })
}

// Routes
app.get('/', (c) => {
  const queryUser = c.req.query('user')
  if (queryUser) {
    return handleSVG(c, queryUser, c.req.query('theme') as Theme, false)
  }
  logEvent({ name: 'page_view', data: { page: 'landing' } })
  c.header('Vary', 'Accept')
  c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  c.header('Netlify-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600')
  const url = new URL(c.req.url)
  return c.html(renderLandingPage(url.origin))
})

app.get('/sample.svg', (c) => {
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
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  })
})

app.get('/profile-svg/:user', (c) => {
  return handleSVG(c, c.req.param('user'), c.req.query('theme') as Theme, true)
})

app.get('/profile/:user', (c) => {
  return handleProfilePage(c, c.req.param('user'), 'transparent' as Theme)
})

app.get('/profile/:user/:theme', (c) => {
  return handleProfilePage(c, c.req.param('user'), c.req.param('theme') as Theme)
})

async function handleProfilePage(c: any, userParam: string, themeParam: Theme) {
  const forceRefresh = c.req.query('no-cache') === 'true'
  const fullRefresh = c.req.query('full-refresh') === 'true'
  const type = c.req.query('type')

  const data = await getStreakData(c, userParam, forceRefresh, fullRefresh, true)
  if (data.error) {
    if (type === 'json') return c.json({ error: data.error })
    return returnErrorSVG(c, data.error)
  }

  const { username, currentBlob, aggregatedTotal } = data as any
  const theme = themeParam
  if (type === 'json') {
    c.header('Vary', 'Accept')
    logEvent({ name: 'api_request', data: { username, theme } })
    return c.json({ username, ...currentBlob, total: aggregatedTotal, theme })
  }

  logEvent({ name: 'page_view', data: { page: 'profile', username } })
  c.header('Vary', 'Accept')
  c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  const profileData = { ...currentBlob, total: aggregatedTotal }
  const url = new URL(c.req.url)
  return c.html(renderProfilePage(url.origin, username as string, theme, profileData))
}

async function handleSVG(c: any, userParam: string, themeParam: Theme, isProfileSVG: boolean) {
  const theme = (themeParam || 'transparent') as Theme
  const forceRefresh = c.req.query('no-cache') === 'true'
  const fullRefresh = c.req.query('full-refresh') === 'true'
  const type = c.req.query('type')

  const data = await getStreakData(c, userParam, forceRefresh, fullRefresh, isProfileSVG)
  if (data.error) {
    if (type === 'json') return c.json({ error: data.error })
    return returnErrorSVG(c, data.error)
  }

  const { username, currentBlob, aggregatedTotal, lastUpdated, isCurrentStale } = data as any

  if (type === 'json') {
    c.header('Vary', 'Accept')
    logEvent({ name: 'api_request', data: { username, theme } })
    return c.json({ username, ...currentBlob, total: aggregatedTotal, theme })
  }

  if (isProfileSVG) {
    logEvent({ name: 'profile_svg_rendered', data: { username, theme, cacheHit: !isCurrentStale } })
    const svg = renderProfileSVG(
      username as string, 
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
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Vary': 'Accept',
      'X-Cache': isCurrentStale ? 'STALE' : 'HIT'
    })
  }

  logEvent({ name: 'svg_rendered', data: { username, theme, cacheHit: !isCurrentStale } })
  const svg = renderSVG({ ...currentBlob.stats, total: aggregatedTotal }, currentBlob.last7, currentBlob.maxCount, theme, lastUpdated)
  return c.body(svg.toString(), 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    'Vary': 'Accept',
    'X-Cache': isCurrentStale ? 'STALE' : 'HIT'
  })
}

export default app