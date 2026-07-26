/** @jsxImportSource hono/jsx */
import { GitHubContributionDay, Theme } from './types.ts'
import { StreakStats } from './logic.ts'
import { GitHubStreakSVG } from './components/GitHubStreakSVG.tsx'
import { ProfileSVG } from './components/ProfileSVG.tsx'
import { ErrorSVG } from './components/ErrorSVG.tsx'
import { LandingPage } from './components/LandingPage.tsx'
import { ProfilePage } from './components/ProfilePage.tsx'

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
export function renderProfilePage(origin: string, user: string, theme: string = 'dark', profile?: any) {
  return <ProfilePage origin={origin} user={user} theme={theme} profile={profile} />
}

/**
 * Renders the OG image canvas SVG
 */
export function renderProfileSVG(
  username: string, 
  name: string | undefined,
  avatarUrl: string | undefined,
  stats: StreakStats, 
  last7: GitHubContributionDay[], 
  maxCount: number, 
  theme: Theme = 'dark', 
  lastUpdated?: string
) {
  return (
    <ProfileSVG 
      username={username}
      name={name}
      avatarUrl={avatarUrl}
      stats={stats} 
      last7={last7} 
      maxCount={maxCount} 
      theme={theme} 
      lastUpdated={lastUpdated}
    />
  )
}
