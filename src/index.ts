import { Hono } from 'hono'

type Bindings = {
  GITHUB_TOKEN: string
}

type GitHubContributionDay = {
  date: string
  contributionCount: number
}

type GitHubResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: GitHubContributionDay[]
          }[]
        }
      }
    }
  }
}

const app = new Hono<{ Bindings: Bindings }>()

const GITHUB_GRAPHQL_QUERY = `
query($login:String!) {
  user(login:$login) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`

async function fetchGitHubData(username: string, token: string): Promise<GitHubContributionDay[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      "User-Agent": "Streak-Pulse-Worker"
    },
    body: JSON.stringify({
      query: GITHUB_GRAPHQL_QUERY,
      variables: { login: username }
    })
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`)
  }

  const json = (await res.json()) as GitHubResponse
  if (!json.data?.user) {
    throw new Error(`User ${username} not found`)
  }

  return json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap(w => w.contributionDays)
}

function calculateStreak(days: GitHubContributionDay[]): number {
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) streak++
    else if (streak > 0) break // Only break if we've already started a streak
  }
  return streak
}

function getIntensityColor(count: number, maxCount: number): string {
  if (count === 0) return "#1e293b14" // Solid-ish looking muted slate
  const ratio = count / Math.max(maxCount, 1)

  // Solid GitHub-style greens (Light theme style: more active = darker)
  if (ratio >= 0.75) return "#166534" // dark green
  if (ratio >= 0.5) return "#22c55e" // medium green
  if (ratio >= 0.25) return "#4ade80" // light green
  return "#bbf7d0" // very light green
}

type Theme = 'light' | 'dark' | 'transparent'

function renderSVG(streak: number, last7: GitHubContributionDay[], maxCount: number, theme: Theme = 'transparent') {
  const width = 420
  const height = 160
  const padding = 20

  const themes = {
    light: {
      bg: '#FFFFFF',
      border: '#E2E8F0',
      text: '#0F172A',
      textMuted: '#64748B',
    },
    dark: {
      bg: '#0B1220',
      border: '#1E293B',
      text: '#FFFFFF',
      textMuted: '#94A3B8',
    },
    transparent: {
      bg: 'none',
      border: 'none',
      text: '#334155', // Neutral dark gray works on both themes
      textMuted: '#64748B',
    }
  }

  const t = themes[theme] || themes.dark
  const dayLabels = last7.map(d => new Date(d.date).toLocaleDateString("en", { weekday: "short" })[0])

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${t.bg !== 'none' ? `<rect width="${width}" height="${height}" rx="16" fill="${t.bg}"/>` : ''}
      ${t.border !== 'none' ? `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="15.5" stroke="${t.border}"/>` : ''}

      <!-- Streak Text -->
      <text x="${padding}" y="40" fill="${t.text}" font-family="sans-serif" font-size="20" font-weight="bold">
        🔥 ${streak} day streak
      </text>
      <text x="${padding}" y="60" fill="${t.textMuted}" font-family="sans-serif" font-size="12">
        based on consecutive contribution days
      </text>

      <!-- Heat Strip -->
      ${last7.map((d, i) => {
    const x = padding + i * ((width - 2 * padding - 6 * 8) / 7 + 8)
    const rectW = (width - 2 * padding - 6 * 8) / 7
    const color = getIntensityColor(d.contributionCount, maxCount)
    return `
          <g>
            <rect x="${x}" y="85" width="${rectW}" height="45" rx="8" fill="${color}"/>
            <text x="${x + rectW / 2}" y="105" fill="${t.text}" font-family="sans-serif" font-size="10" text-anchor="middle">
              ${dayLabels[i]}
            </text>
            <text x="${x + rectW / 2}" y="120" fill="${t.text}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
              ${d.contributionCount}
            </text>
          </g>
        `
  }).join('')}
    </svg>
  `
}

app.all('/', async (c) => {
  const username = c.req.query('user')
  if (!username) {
    return c.text('Streak Pulse API. Use /?user=username&theme=transparent|light|dark')
  }

  const token = c.env.GITHUB_TOKEN
  if (!token) {
    return c.json({ error: 'GITHUB_TOKEN is not configured' }, 500)
  }

  const theme = (c.req.query('theme') || 'transparent') as Theme

  try {
    const allDays = await fetchGitHubData(username, token)
    const streak = calculateStreak(allDays)
    const last7 = allDays.slice(-7)
    const maxCount = Math.max(...last7.map(d => d.contributionCount), 1)

    const type = c.req.query('type')

    if (type === 'json') {
      return c.json({
        username,
        streak,
        last7,
        maxCount,
        theme
      })
    }

    const svg = renderSVG(streak, last7, maxCount, theme)
    return c.body(svg, 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=3600'
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

export default app
