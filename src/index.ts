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
import { registerAppTool, registerAppResource, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";

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
    
    const WIDGET_RESOURCE_URI = "ui://github-streak/svg-preview";

    const mcpServer = new McpServer({
      name: "github-streak-mcp",
      version: pkg.version
    }, {
      capabilities: { tools: {}, resources: {} }
    });

    const widgetHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG Preview Tool</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: transparent; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; }
    #widget { max-width: 100%; text-align: center; }
    #widget img { max-width: 100%; height: auto; border-radius: 8px; }
    .loading { color: #6c7086; font-size: 14px; }
  </style>
</head>
<body>
  <div id="widget">
    <p id="loading" class="loading">Waiting for SVG preview...</p>
    <img id="preview" style="display: none;" alt="SVG Preview" />
  </div>
  <script type="module">
    let initReqId = 1;

    function sendRequest(method, params) {
      const id = initReqId++;
      window.parent.postMessage({ jsonrpc: '2.0', id, method, params }, '*');
      return id;
    }

    function sendNotification(method, params) {
      window.parent.postMessage({ jsonrpc: '2.0', method, params }, '*');
    }

    function handleToolResult(result) {
      if (!result) return;
      const structured = result.structuredContent || result;
      const url = structured?.previewUrl || structured?.url || (typeof result === 'string' && result.startsWith('http') ? result : null);

      const img = document.getElementById('preview');
      const loading = document.getElementById('loading');

      if (url) {
        img.src = url;
        img.style.display = 'inline-block';
        if (loading) loading.style.display = 'none';
        return;
      }

      const content = result.content || [];
      for (let i = 0; i < content.length; i++) {
        const c = content[i];
        if (c.type === 'image' && c.data) {
          img.src = 'data:' + (c.mimeType || 'image/svg+xml') + ';base64,' + c.data;
          img.style.display = 'inline-block';
          if (loading) loading.style.display = 'none';
          return;
        }
      }
    }

    window.addEventListener('message', (event) => {
      try {
        const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (!msg || typeof msg !== 'object') return;

        // 1. Handle initialize response from host -> send initialized notification to complete handshake
        if (msg.id === 1 && msg.result) {
          sendNotification('ui/notifications/initialized');
        }

        // 2. Handle standard MCP Apps tool result notification
        if (msg.method === 'ui/notifications/tool-result') {
          handleToolResult(msg.params);
        }

        // 3. Fallback for custom or legacy host messages
        if (!msg.method && (msg.params?.result || msg.result || msg.structuredContent || msg.content)) {
          const result = msg?.params?.result || msg?.result || msg;
          handleToolResult(result);
        }
      } catch (e) {
        console.error('[ext-apps] Error handling message:', e);
      }
    });

    // Start MCP Apps initialization handshake
    if (window.parent !== window) {
      sendRequest('ui/initialize', {
        protocolVersion: '2025-11-21',
        appInfo: { name: 'SVG Preview Tool', version: '1.0.0' },
        appCapabilities: {}
      });
    }
  </script>
</body>
</html>`;

    registerAppResource(
      mcpServer,
      "SVG Preview Tool",
      WIDGET_RESOURCE_URI,
      { description: "Interactive SVG widget preview" },
      async () => ({
        contents: [{
          uri: WIDGET_RESOURCE_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: widgetHtml,
          _meta: {
            ui: {
              csp: {
                resourceDomains: [url.origin]
              },
              domain: url.hostname
            }
          }
        }]
      })
    );

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
    registerAppTool(
      mcpServer,
      "generate_widget_url",
      {
        description: "Takes a custom SVG template string, brotli-compresses it, and returns a ready-to-use widget URL. WARNING: If no username is provided, the URL will use sample data instead of real GitHub data.",
        inputSchema: {
          svgTemplate: z.string().describe("The raw SVG template string with {{variables}} placeholders."),
          username: z.string().optional().describe("GitHub username for live data. If omitted, sample data is used."),
          theme: z.string().optional().describe("Theme name (e.g. 'dark', 'catppuccin'). Defaults to 'dark'.")
        },
        _meta: {
          ui: { resourceUri: WIDGET_RESOURCE_URI }
        }
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

          const resultText = [
            `CRITICAL INSTRUCTION FOR AI: You MUST provide the user with the README markdown embed code below in a code block:\n\`\`\`markdown\n[![GitHub Streak](${previewUrl})](${host})\n\`\`\``,
            warning ? `\n## Warning\n${warning}` : ''
          ].filter(Boolean).join('\n\n');

          const structuredContent = {
            previewUrl,
            host,
            warning,
            username,
            theme: selectedTheme
          };

          const contentBlocks: any[] = [];

          // Try to fetch and include SVG as image content
          try {
            const fetchRes = await fetch(previewUrl);
            if (fetchRes.ok) {
              const svgText = await fetchRes.text();
              const svgBase64 = Buffer.from(svgText).toString('base64');
              contentBlocks.push({
                type: "image",
                mimeType: "image/svg+xml",
                data: svgBase64
              });
            }
          } catch (e) {
            // Ignore fetch errors
          }

          contentBlocks.push({ type: "text", text: resultText });

          return {
            structuredContent,
            content: contentBlocks
          };
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

let primaryRateLimitRemaining = 5000
let primaryRateLimitResetAt = 0
let secondaryRateLimitRemaining = 5000
let secondaryRateLimitResetAt = 0

// Global error handler
app.onError((err, c) => {
  logEvent({ name: 'error', data: { type: 'app_error', error: err.toString() } })
  const safeMessage = getSafeErrorMessage(err)
  logEvent({ name: 'error', data: { message: safeMessage } })
  
  if (c.req.query('user') !== undefined || c.req.path.startsWith('/profile-svg/')) {
    c.header('Vary', 'Accept')
    return c.body(renderErrorSVG(safeMessage).toString(), 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=60'
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
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=60'
    })
  }
  c.header('Vary', 'Accept')
  return c.html('<h1>404 Not Found</h1>', 404)
})

async function refreshUserData(
  token: string, 
  username: string, 
  historyKey: string, 
  currentKey: string, 
  activeVersion: number, 
  isHistoryStale: boolean, 
  fullRefresh: boolean,
  needsProfileData: boolean = true,
  existingCurrentBlob?: any,
  isSecondary: boolean = false
) {
  if (!token) throw new Error('Config Error');
  const currentYear = new Date().getFullYear()

  const partialFetch = (!isHistoryStale && !fullRefresh) ? true : false
  logEvent({ name: 'github_api_fetch', data: { username, token: isSecondary ? 'secondary' : 'primary', partial: partialFetch } })
  
  const cachedEtag = existingCurrentBlob?.githubEtag;
  const fresh = await fetchGitHubData(username, token, partialFetch, needsProfileData, cachedEtag)

  if (fresh.isNotModified) {
    const streakStore = getStore('streak-data')
    existingCurrentBlob.timestamp = Date.now()
    existingCurrentBlob.githubEtag = fresh.githubEtag || existingCurrentBlob.githubEtag
    await streakStore.setJSON(currentKey, existingCurrentBlob).catch(() => {})
    return { newCurrentBlob: existingCurrentBlob, newHistoryBlob: null }
  }
  
  if (fresh.rateLimit) {
    if (isSecondary) {
      secondaryRateLimitRemaining = fresh.rateLimit.remaining
      secondaryRateLimitResetAt = new Date(fresh.rateLimit.resetAt).getTime()
    } else {
      primaryRateLimitRemaining = fresh.rateLimit.remaining
      primaryRateLimitResetAt = new Date(fresh.rateLimit.resetAt).getTime()
    }
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
    dataTimestamp: Date.now(),
    cacheVersion: activeVersion,
    githubEtag: fresh.githubEtag || existingCurrentBlob?.githubEtag
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

  const streakStore = getStore('streak-data')
  const historyKey = `${username}:history`
  const currentKey = `${username}:current`

  const primaryToken = c.env?.GITHUB_TOKEN
  const secondaryToken = c.env?.GITHUB_TOKEN_SECONDARY

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

  const now = Date.now()
  const fastLaneMs = (Number(c.env?.FAST_LANE_TTL_MINUTES) || 5) * 60000
  const slowLaneMs = (Number(c.env?.SLOW_LANE_TTL_MINUTES) || 60) * 60000
  const isCurrentStaleFast = isVersionStale || !currentBlob || (now - currentBlob.timestamp > fastLaneMs)
  const isCurrentStaleSlow = isVersionStale || !currentBlob || (now - currentBlob.timestamp > slowLaneMs)
  const isCurrentStale = isCurrentStaleSlow // Keep original meaning for external return payload
  
  let newHistoryBlob = historyBlob;
  let newCurrentBlob = currentBlob;
  let tokenTriggered: 'primary' | 'secondary' | 'none' = 'none';

  const isProfileDataMissing = needsProfileData && currentBlob && !currentBlob.avatarUrl;

  if (isCurrentStaleFast || forceRefresh || fullRefresh || isHistoryStale || isProfileDataMissing) {
    if (newCurrentBlob && !forceRefresh && !fullRefresh && !isProfileDataMissing) {
      let waitUntilFn: ((promise: Promise<any>) => void) | undefined
      try {
          if (c.executionCtx && c.executionCtx.waitUntil) waitUntilFn = c.executionCtx.waitUntil.bind(c.executionCtx)
      } catch (e) {}

      // Optimistically update timestamp to prevent cache stampede (thundering herd)
      // This prevents concurrent requests from all triggering background fetches
      newCurrentBlob.timestamp = now;
      if (waitUntilFn) {
        waitUntilFn(streakStore.setJSON(currentKey, newCurrentBlob).catch(() => {}));
      }

      if (!isCurrentStaleSlow) {
        tokenTriggered = 'secondary';
        // FAST LANE - Secondary Token (if configured)
        const isSecondaryQuotaExhausted = secondaryRateLimitRemaining === 0 && now < secondaryRateLimitResetAt
        if (!isSecondaryQuotaExhausted && secondaryToken) {
          const fetchTask = refreshUserData(secondaryToken, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob, true).catch((err: any) => {
              logEvent({ name: 'error', data: { type: 'fast_lane_refresh_failed', username, error: getSafeErrorMessage(err) } })
          })
          if (waitUntilFn) waitUntilFn(fetchTask)
        }
      } else {
        tokenTriggered = 'primary';
        // SLOW LANE - Primary Token
        const isPrimaryQuotaExhausted = primaryRateLimitRemaining === 0 && now < primaryRateLimitResetAt
        if (primaryRateLimitRemaining < 20 || isPrimaryQuotaExhausted) {
          logEvent({ name: 'warn_quota_low', data: { username, token: 'primary' } })
        } else {
          const fetchTask = refreshUserData(primaryToken, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob, false).catch((err: any) => {
              logEvent({ name: 'error', data: { type: 'background_refresh_failed', username, error: getSafeErrorMessage(err) } })
          })
          if (waitUntilFn) waitUntilFn(fetchTask)
        }
      }
    } else {
        // Synchronous cold start or forced fetch
        const tokenToUse = (forceRefresh || fullRefresh) && secondaryToken ? secondaryToken : primaryToken;
        const isSecondary = tokenToUse === secondaryToken && !!secondaryToken;
        tokenTriggered = isSecondary ? 'secondary' : 'primary';
        
        const isExhausted = isSecondary 
          ? (secondaryRateLimitRemaining === 0 && now < secondaryRateLimitResetAt)
          : (primaryRateLimitRemaining === 0 && now < primaryRateLimitResetAt);

        if (isExhausted) {
            logEvent({ name: 'warn_quota_low', data: { username, token: isSecondary ? 'secondary' : 'primary' } })
            if (!newCurrentBlob) return { error: 'Rate Limit Exceeded' }
        } else {
            try {
                const refreshed = await refreshUserData(tokenToUse, username, historyKey, currentKey, activeVersion, isHistoryStale, fullRefresh, needsProfileData, newCurrentBlob, isSecondary)
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
    return { error: 'Data Not Available' }
  }

  const aggregatedTotal = (newHistoryBlob?.total || 0) + newCurrentBlob.stats.total
  const lastUpdated = new Date(newCurrentBlob.dataTimestamp || newCurrentBlob.timestamp).toLocaleTimeString('en-US', { timeZone: 'UTC' }) + ' UTC'

  return {
    username,
    currentBlob: newCurrentBlob,
    aggregatedTotal,
    lastUpdated,
    isCurrentStale,
    tokenTriggered
  }
}

function returnErrorSVG(c: any, msg: string) {
  c.header('Vary', 'Accept')
  return c.body(renderErrorSVG(msg).toString(), 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=60'
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
    'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=3600'
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

  const { username, currentBlob, aggregatedTotal, lastUpdated } = data as any
  const theme = themeParam
  const camoTtl = c.env?.CAMO_CACHE_TTL_SECONDS !== undefined ? Number(c.env.CAMO_CACHE_TTL_SECONDS) : 120
  
  const etagValue = `W/"html-${username}-${aggregatedTotal}-${currentBlob.stats.current.count}-${lastUpdated}-${theme}"`
  if (c.req.header('If-None-Match') === etagValue && !forceRefresh && !fullRefresh) {
    return c.body(null, 304, {
      'Cache-Control': `public, max-age=${camoTtl}, s-maxage=${camoTtl}`,
      'Netlify-CDN-Cache-Control': `public, s-maxage=${camoTtl}`,
      'ETag': etagValue,
      'Vary': 'Accept'
    })
  }
  if (type === 'json') {
    c.header('Vary', 'Accept')
    logEvent({ name: 'api_request', data: { username, theme } })
    return c.json({ username, ...currentBlob, total: aggregatedTotal, theme })
  }

  logEvent({ name: 'page_view', data: { page: 'profile', username } })
  c.header('Vary', 'Accept')
  c.header('Cache-Control', `public, max-age=${camoTtl}, s-maxage=${camoTtl}`)
  c.header('Netlify-CDN-Cache-Control', `public, s-maxage=${camoTtl}`)
  c.header('ETag', etagValue)
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

  const { username, currentBlob, aggregatedTotal, lastUpdated, isCurrentStale, tokenTriggered } = data as any

  const custom = c.req.query('custom')
  const camoTtl = c.env?.CAMO_CACHE_TTL_SECONDS !== undefined ? Number(c.env.CAMO_CACHE_TTL_SECONDS) : 120
  const etagValue = `W/"${username}-${aggregatedTotal}-${currentBlob.stats.current.count}-${lastUpdated}-${theme}-${isProfileSVG}-${custom || ''}"`
  
  if (c.req.header('If-None-Match') === etagValue && !forceRefresh && !fullRefresh) {
    return c.body(null, 304, {
      'Cache-Control': `public, max-age=${camoTtl}, s-maxage=${camoTtl}`,
      'Netlify-CDN-Cache-Control': `public, s-maxage=${camoTtl}`,
      'ETag': etagValue,
      'Vary': 'Accept'
    })
  }

  if (type === 'json') {
    c.header('Vary', 'Accept')
    logEvent({ name: 'api_request', data: { username, theme } })
    return c.json({ username, ...currentBlob, total: aggregatedTotal, theme })
  }

  if (isProfileSVG) {
    logEvent({ name: 'profile_svg_rendered', data: { username, theme, cacheHit: !isCurrentStale, token: tokenTriggered } })
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
      'Cache-Control': `public, max-age=${camoTtl}, s-maxage=${camoTtl}`,
      'Netlify-CDN-Cache-Control': `public, s-maxage=${camoTtl}`,
      'ETag': etagValue,
      'Vary': 'Accept',
      'X-Cache': isCurrentStale ? 'STALE' : 'HIT'
    })
  }

  logEvent({ name: 'svg_rendered', data: { username, theme, cacheHit: !isCurrentStale, token: tokenTriggered } })
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
    'Cache-Control': `public, max-age=${camoTtl}, s-maxage=${camoTtl}`,
    'Netlify-CDN-Cache-Control': `public, s-maxage=${camoTtl}`,
    'ETag': etagValue,
    'Vary': 'Accept',
    'X-Cache': isCurrentStale ? 'STALE' : 'HIT'
  })
}

export default app