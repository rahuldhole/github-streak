import { Hono } from 'hono'
import { Bindings, Theme } from './types'
import { fetchGitHubData } from './github'
import { calculateStreakStats } from './logic'
import { renderSVG, renderLandingPage, renderErrorSVG } from './renderer'

const app = new Hono<{ Bindings: Bindings }>()

app.all('/', async (c) => {
  const username = c.req.query('user')

  if (!username) {
    return c.html(renderLandingPage())
  }

  const token = c.env.GITHUB_TOKEN
  if (!token) {
    return c.body(renderErrorSVG('Config Error'), 500, {
      'Content-Type': 'image/svg+xml'
    })
  }

  const theme = (c.req.query('theme') || 'transparent') as Theme

  try {
    const { days: allDays, totalContributions, contributionYears } = await fetchGitHubData(username, token)
    const stats = calculateStreakStats(allDays, totalContributions, contributionYears)
    const last7 = allDays.slice(-7)
    const maxCount = Math.max(...last7.map(d => d.contributionCount), 1)

    const type = c.req.query('type')

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
    return c.body(svg, 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200'
    })
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found')
    const errorSvg = renderErrorSVG(isNotFound ? 'User Not Found' : 'GitHub API Error')
    
    return c.body(errorSvg, 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    })
  }
})

export default app
