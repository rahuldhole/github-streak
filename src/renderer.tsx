import { GitHubContributionDay, Theme } from './types'
import { StreakStats } from './logic'
import { GitHubStreakSVG } from './components/GitHubStreakSVG'
import { ErrorSVG } from './components/ErrorSVG'
import { LandingPage } from './components/LandingPage'

/**
 * Renders the main GitHub Streak SVG card
 */
export function renderSVG(stats: StreakStats, last7: GitHubContributionDay[], maxCount: number, theme: Theme = 'transparent') {
  return (
    <GitHubStreakSVG 
      stats={stats} 
      last7={last7} 
      maxCount={maxCount} 
      theme={theme} 
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
