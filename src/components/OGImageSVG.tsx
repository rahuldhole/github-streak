/** @jsxImportSource hono/jsx */
import { GitHubStreakSVG, themes } from './GitHubStreakSVG.tsx'
import { GitHubContributionDay, Theme } from '../types.ts'
import { StreakStats } from '../logic.ts'

export function OGImageSVG({ 
  username,
  stats, 
  last7, 
  maxCount, 
  theme = 'dark',
  lastUpdated
}: { 
  username: string,
  stats: StreakStats, 
  last7: GitHubContributionDay[], 
  maxCount: number, 
  theme: Theme,
  lastUpdated?: string
}) {
  const width = 1200
  const height = 630
  const t = themes[theme] || themes.dark

  // Use a nice gradient for background
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color={theme === 'light' ? '#f8fafc' : '#020617'} />
          <stop offset="100%" stop-color={theme === 'light' ? '#e2e8f0' : '#0f172a'} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width={width} height={height} fill="url(#bg-grad)"/>

      {/* Title */}
      <text 
        x={width / 2} 
        y="160" 
        font-family="sans-serif" 
        font-size="64" 
        font-weight="bold" 
        fill={t.text} 
        text-anchor="middle"
      >
        @{username}'s GitHub Streak
      </text>
      
      <text 
        x={width / 2} 
        y="210" 
        font-family="sans-serif" 
        font-size="32" 
        fill={t.textMuted} 
        text-anchor="middle"
      >
        🔥 Check out my contribution streak!
      </text>

      {/* Embed the standard widget, scaled up */}
      {/* Widget is 420x180. Scale by 2 = 840x360. */}
      {/* Center X: (1200 - 840) / 2 = 180 */}
      {/* Center Y: 630 - 360 - 50 = 220 */}
      <g transform="translate(180, 240) scale(2)">
        <GitHubStreakSVG 
          stats={stats} 
          last7={last7} 
          maxCount={maxCount} 
          theme={theme}
          lastUpdated={lastUpdated}
        />
      </g>
    </svg>
  )
}
