import { Hono } from 'hono'
import { getStore } from '@netlify/blobs'
import { Bindings, Theme } from './types.ts'
import { fetchGitHubData } from './github.ts'
import { calculateStreakStats } from './logic.ts'
import { renderSVG, renderLandingPage, renderErrorSVG, renderProfilePage, renderProfileSVG, renderCustomizePage } from './renderer.tsx'
import { renderCustomTemplate } from './components/CustomTemplateRenderer.ts'
import { brotliCompressSync, brotliDecompressSync } from 'node:zlib'
import { Buffer } from 'node:buffer'
import { logEvent, GITHUB_USERNAME_REGEX, getSafeErrorMessage } from './utils.ts'
import pkg from '../package.json' with { type: 'json' }

const cacheStoreVersion = pkg.cacheStoreVersion

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const app = new Hono<{ Bindings: Bindings }>()

class HonoSSEServerTransport {
  public controller?: ReadableStreamDefaultController;
  public sessionId: string;
  
  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: any) => void;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }
  
  async start() {}
  
  async send(message: any) {
    if (!this.controller) return;
    const encoder = new TextEncoder();
    this.controller.enqueue(encoder.encode(`event: message\ndata: ${JSON.stringify(message)}\n\n`));
  }
  
  async close() {
    if (this.controller) {
      try { this.controller.close(); } catch (e) {}
    }
    this.onclose?.();
  }
}

const activeTransports = new Map<string, HonoSSEServerTransport>();

app.all('/mcp', async (c) => {
  const req = c.req.raw;
  const url = new URL(req.url);
  const sessionId = req.headers.get('mcp-session-id') || url.searchParams.get("sessionId");

  if (req.method === 'GET') {
    // Establish new SSE connection
    const newSessionId = crypto.randomUUID();
    const transport = new HonoSSEServerTransport(newSessionId);
    
    const mcpServer = new McpServer({
      name: "github-streak-mcp",
      version: pkg.version
    }, {
      capabilities: { tools: {} }
    });

    // Tool 1: Get the template guide with all available variables
    mcpServer.tool("get_template_guide",
      "Get the complete guide for designing custom GitHub Streak SVG widgets. Returns all available template variables, theme CSS custom properties, and an example template. Call this FIRST before designing any widget.",
      {},
      async () => {
        const guide = `# GitHub Streak Custom Widget Template Guide

## 🎨 AI Designer Instructions
1. **Be Creative & Advanced**: If the user hasn't specified a design, default to creating an **advanced, animated, and visually stunning SVG**. Use CSS animations, gradients, glassmorphism, or modern UI trends.
2. **Suggest Designs**: Always suggest 2-3 new, wildly different design ideas (e.g. cyber-punk, minimalist retro, data-dashboard) to the user after you present your widget.

## Template Variables
These mustache-style variables (e.g. {{variableName}}) are replaced with real data at render time:

### Stats Variables
- {{currentStreak}} — Current streak count (e.g. "42")
- {{currentStreakDate}} — Date range of current streak (e.g. "Jan 1 - Feb 12")
- {{personalBest}} — Longest streak count (e.g. "99")
- {{personalBestDate}} — Date range of longest streak (e.g. "10/05/23 - 17/08/23")
- {{totalContribs}} — Total contributions, compact format (e.g. "1.3K")
- {{totalContribsDate}} — Year range (e.g. "2015 - 2024")
- {{lastUpdated}} — Timestamp string (e.g. "Last Updated: 2024-03-07")

### Last 7 Days Variables (i = 0 to 6, where 0 is oldest)
- {{day0Count}} ... {{day6Count}} — Contribution count for that day
- {{day0Label}} ... {{day6Label}} — Day label ("M", "T", "W", etc.)
- {{day0Level}} ... {{day6Level}} — Intensity level 0-4 (for CSS var mapping)
- {{day0Color}} ... {{day6Color}} — Direct hex color for that day's intensity
- {{day0TextColor}} ... {{day6TextColor}} — Contrasting text color

### Theme Variables
- {{theme.bg}}, {{theme.border}}, {{theme.text}}, {{theme.textMuted}}, {{theme.accent}}

### Pre-built Heat Strip
- {{heatStrip}} — A pre-rendered SVG group of 7 contribution rectangles

## CSS Custom Properties Convention
Define these in your SVG <style> block for level-based coloring:
  --l0: empty/no contributions color
  --l1: low contributions color
  --l2: medium contributions color
  --l3: high contributions color
  --l4: max contributions color
  --text-l0 through --text-l4: contrasting text colors for each level

Use them with level variables: fill="var(--l{{day0Level}})"

## Available Themes
transparent, dark, light, catppuccin, nord, dracula, monokai, synthwave, solarizedDark, solarizedLight, onedark, gruvbox

## API Usage
After designing your SVG template, use the generate_widget_url tool to get a live preview URL.
The URL format is: /v1/?user=USERNAME&theme=THEME&custom=ENCODED_TEMPLATE
Without a user param, use /v1/sample.svg?custom=ENCODED for sample data preview.

## ⚠️ Important
- Templates MUST be valid SVG
- Keep templates compact (brotli compression has URL length limits)
- The viewBox is typically "0 0 420 180" for standard or "0 0 600 200" for wide layouts
- Always include xmlns="http://www.w3.org/2000/svg"`;

        return { content: [{ type: "text", text: guide }] };
      }
    );

    // Tool 2: Generate a live widget URL from an SVG template
    mcpServer.tool("generate_widget_url",
      "Takes a custom SVG template string, brotli-compresses it, and returns a ready-to-use widget URL. WARNING: If no username is provided, the URL will use sample data instead of real GitHub data.",
      {
        svgTemplate: z.string().describe("The raw SVG template string with {{variables}} placeholders."),
        username: z.string().optional().describe("GitHub username for live data. If omitted, sample data is used."),
        theme: z.string().optional().describe("Theme name (e.g. 'dark', 'catppuccin'). Defaults to 'dark'.")
      },
      async ({ svgTemplate, username, theme }) => {
        try {
          const compressed = brotliCompressSync(Buffer.from(svgTemplate));
          const encoded = compressed.toString('base64url');
          const host = url.origin;
          const selectedTheme = theme || 'dark';

          let previewUrl: string;
          let warning = '';

          if (username) {
            previewUrl = `${host}/v1/?user=${encodeURIComponent(username)}&theme=${selectedTheme}&custom=${encoded}`;
          } else {
            previewUrl = `${host}/v1/sample.svg?theme=${selectedTheme}&custom=${encoded}`;
            warning = '⚠️ No username provided — this URL uses SAMPLE DATA. Add a user parameter for real GitHub contribution data.';
          }

          const result = [
            `CRITICAL INSTRUCTION FOR AI: The generated URL is very long. DO NOT show the raw URL to the user directly. Instead, you MUST render the SVG as a markdown image preview so the user can see it immediately in the chat!`,
            `Use this exact markdown format to show the preview:\n![Widget Preview](${previewUrl})\n`,
            `Then, provide the user with the README markdown embed code in a code block:\n\`\`\`markdown\n[![GitHub Streak](${previewUrl})](${host})\n\`\`\``,
            warning ? `\n## Warning\n${warning}` : ''
          ].filter(Boolean).join('\n\n');

          return { content: [{ type: "text", text: result }] };
        } catch (error: any) {
          return { content: [{ type: "text", text: `Error compressing template: ${error.message}` }], isError: true };
        }
      }
    );

    activeTransports.set(newSessionId, transport);
    mcpServer.connect(transport);

    const stream = new ReadableStream({
      start(controller) {
        transport.controller = controller;
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(`event: endpoint\ndata: /mcp?sessionId=${newSessionId}\n\n`));
      },
      cancel() {
        activeTransports.delete(newSessionId);
        transport.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } else if (req.method === 'POST') {
    if (!sessionId || !activeTransports.has(sessionId)) {
      return c.json({ error: 'Session not found.' }, 404);
    }
    const transport = activeTransports.get(sessionId)!;
    const body = await req.json();
    if (transport.onmessage) {
      transport.onmessage(body);
    }
    return c.text('Accepted', 202);
  }

  return c.json({ error: 'Method not allowed' }, 405);
})

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

app.get('/v1/', (c) => {
  const queryUser = c.req.query('user')
  if (queryUser) {
    return handleSVG(c, queryUser, c.req.query('theme') as Theme, false, 'v1')
  }
  return c.json({ error: 'Missing user parameter' }, 400)
})

app.get('/customize', (c) => {
  logEvent({ name: 'page_view', data: { page: 'customize' } })
  c.header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  const url = new URL(c.req.url)
  return c.html(renderCustomizePage(url.origin))
})

app.post('/api/compress', async (c) => {
  try {
    const text = await c.req.text()
    if (!text) return c.json({ error: 'No content' }, 400)
    const compressed = brotliCompressSync(Buffer.from(text))
    const base64Url = compressed.toString('base64url')
    return c.json({ compressed: base64Url })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

app.post('/api/decompress', async (c) => {
  try {
    const base64Url = await c.req.text()
    if (!base64Url) return c.json({ error: 'No content' }, 400)
    const decompressed = brotliDecompressSync(Buffer.from(base64Url, 'base64url')).toString()
    return c.json({ decompressed })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

const handleSampleSVG = (c: any) => {
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
  const theme = (c.req.query('theme') || 'dark') as Theme
  const custom = c.req.query('custom')
  let svgStr = ''
  
  if (custom) {
    try {
      const templateStr = brotliDecompressSync(Buffer.from(custom, 'base64url')).toString()
      svgStr = renderCustomTemplate(templateStr, mockStats as any, mockLast7 as any, 10, theme, 'Sample Data')
    } catch (e) {
      svgStr = renderErrorSVG('Invalid custom template').toString()
    }
  } else {
    svgStr = renderSVG(mockStats as any, mockLast7 as any, 10, theme, 'Sample Data').toString()
  }

  c.header('Vary', 'Accept')
  return c.body(svgStr, 200, { 
    'Content-Type': 'image/svg+xml', 
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  })
}

app.get('/sample.svg', handleSampleSVG)
app.get('/v1/sample.svg', handleSampleSVG)

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

async function handleSVG(c: any, userParam: string, themeParam: Theme, isProfileSVG: boolean, apiVersion?: string) {
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
  const custom = c.req.query('custom')
  let svgStr = ''
  
  // Custom templates are strictly tied to /v1/ and its corresponding apiVersion handler,
  // preventing legacy breaks if variables change in future versions.
  if (custom && !isProfileSVG && (apiVersion === 'v1' || c.req.path.startsWith('/v1/'))) {
    try {
      const templateStr = brotliDecompressSync(Buffer.from(custom, 'base64url')).toString()
      svgStr = renderCustomTemplate(templateStr, { ...currentBlob.stats, total: aggregatedTotal }, currentBlob.last7, currentBlob.maxCount, theme, lastUpdated)
    } catch (e) {
      svgStr = renderErrorSVG('Invalid custom template').toString()
    }
  } else {
    svgStr = renderSVG({ ...currentBlob.stats, total: aggregatedTotal }, currentBlob.last7, currentBlob.maxCount, theme, lastUpdated).toString()
  }

  return c.body(svgStr, 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    'Vary': 'Accept',
    'X-Cache': isCurrentStale ? 'STALE' : 'HIT'
  })
}

export default app