import { GitHubStreakSVG, themes } from './GitHubStreakSVG.tsx'
import { GitHubContributionDay, Theme } from '../types.ts'
import { StreakStats } from '../logic.ts'

export function ProfileSVG({ 
  username,
  name,
  avatarUrl,
  stats, 
  last7, 
  maxCount, 
  theme = 'dark',
  lastUpdated
}: { 
  username: string,
  name?: string,
  avatarUrl?: string,
  stats: StreakStats, 
  last7: GitHubContributionDay[], 
  maxCount: number, 
  theme: Theme,
  lastUpdated?: string
}): string {
  const width = 1200
  const height = 630
  const isLight = theme === 'light' || theme === 'transparent'
  const t = themes[theme] || themes.dark

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="light-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#e2e8f0" />
        </linearGradient>
        <radialGradient id="dark-bg-grad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#451a03" />
          <stop offset="100%" stop-color="#050505" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="${isLight ? "0.15" : "0.75"}" />
        </filter>
      </defs>
      
      <rect width="${width}" height="${height}" fill="${isLight ? "url(#light-bg-grad)" : "url(#dark-bg-grad)"}"/>

      <g transform="translate(600, 70)">
        ${avatarUrl ? `
          <g transform="translate(-40, -40)">
            <defs>
              <clipPath id="avatar-clip">
                <circle cx="40" cy="40" r="40" />
              </clipPath>
            </defs>
            <circle cx="40" cy="40" r="42" fill="${t.border}" />
            <image href="${avatarUrl}" x="0" y="0" width="80" height="80" clip-path="url(#avatar-clip)" />
          </g>
        ` : `
          <g transform="translate(-40, -40)">
            <circle cx="40" cy="40" r="40" fill="${t.border}" />
            <text x="40" y="48" font-family="sans-serif" font-size="28" font-weight="bold" fill="${t.text}" text-anchor="middle">
              ${username.charAt(0).toUpperCase()}
            </text>
          </g>
        `}

        ${name ? `
          <text y="70" font-family="sans-serif" font-size="36" font-weight="bold" fill="${t.text}" text-anchor="middle">
            ${name}
          </text>
        ` : ''}
        
        <g transform="translate(-${(username.length * 11 + 30) / 2}, ${name ? '100' : '80'})" opacity="0.8">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="${t.textMuted}" transform="scale(1.2)"></path>
          <text x="25" y="14" font-family="sans-serif" font-size="20" fill="${t.textMuted}" text-anchor="start">
            @${username}
          </text>
        </g>
      </g>

      <g transform="translate(180, 200) scale(2)" filter="url(#shadow)">
        ${GitHubStreakSVG({ stats, last7, maxCount, theme, lastUpdated })}
      </g>

      <g transform="translate(600, 585)">
        <text font-family="sans-serif" font-size="20" font-weight="bold" fill="${t.text}" text-anchor="middle" opacity="0.8">
          <tspan font-family="sans-serif" fill="#ff9d00">🔥</tspan> GitHub Streak
        </text>
        <text y="24" font-family="sans-serif" font-size="14" fill="${t.textMuted}" text-anchor="middle" opacity="0.8">
          Generate a Duolingo-inspired GitHub streak widget for your profile.
        </text>
      </g>
    </svg>
  `
}
