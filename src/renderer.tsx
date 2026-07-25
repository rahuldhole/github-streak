/** @jsxImportSource hono/jsx */
import { GitHubContributionDay, Theme } from './types.ts'
import { StreakStats } from './logic.ts'
import { GitHubStreakSVG } from './components/GitHubStreakSVG.tsx'
import { OGImageSVG } from './components/OGImageSVG.tsx'
import { ErrorSVG } from './components/ErrorSVG.tsx'
import { LandingPage } from './components/LandingPage.tsx'
import { SharePage } from './components/SharePage.tsx'

/**
 * Renders the main GitHub Streak SVG card
 */
export function renderSVG(stats: StreakStats, last7: GitHubContributionDay[], maxCount: number, theme: Theme = 'transparent', lastUpdated?: string) {
  return (
    <GitHubStreakSVG 
      stats={stats} 
      last7={last7} 
      maxCount={maxCount} 
      theme={theme} 
      lastUpdated={lastUpdated}
    />
  )
}

/**
 * Renders a stylized error SVG card
 */
export function renderErrorSVG(message: string) {
  return <ErrorSVG message={message} />
}

/**
 * Renders the interactive marketing landing page
 */
export function renderLandingPage(origin: string = '') {
  return <LandingPage origin={origin} />
}

/**
 * Renders the social share page
 */
export function renderSharePage(origin: string, user: string, theme: string = 'dark') {
  return <SharePage origin={origin} user={user} theme={theme} />
}

/**
 * Renders the OG image canvas SVG
 */
export function renderOGImage(username: string, stats: StreakStats, last7: GitHubContributionDay[], maxCount: number, theme: Theme = 'dark', lastUpdated?: string) {
  return (
    <OGImageSVG 
      username={username}
      stats={stats} 
      last7={last7} 
      maxCount={maxCount} 
      theme={theme} 
      lastUpdated={lastUpdated}
    />
  )
}
