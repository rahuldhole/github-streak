/** @jsxImportSource hono/jsx */
import { GitHubContributionDay, Theme } from '../types.ts'
import { getIntensityColor, StreakStats } from '../logic.ts'

function formatFullDate(dateStr: string): string {
  if (!dateStr) return '---'
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    const [, year, month, day] = match
    return `${day}/${month}/${year.slice(-2)}`
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '---'
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = String(d.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

function formatShortDate(dateStr: string): string {
  if (!dateStr) return '---'
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  let d: Date
  if (match) {
    const [, year, month, day] = match
    d = new Date(Number(year), Number(month) - 1, Number(day))
  } else {
    d = new Date(dateStr)
  }
  if (isNaN(d.getTime())) return '---'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(num)
}

export const themes = {
  light: {
    bg: '#FFFFFF',
    border: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    accent: '#22c55e'
  },
  dark: {
    bg: '#0B1220',
    border: '#1E293B',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    accent: '#22c55e'
  },
  transparent: {
    bg: 'none',
    border: 'none',
    text: '#626a75ff',
    textMuted: '#576374ff',
    accent: '#15af4eff'
  }
}

interface StatItemProps {
  label: string
  value: string | number
  subValue: string
  x: number | string
  y: number | string
}

const StatItem = ({ label, value, subValue, x, y }: StatItemProps) => (
  <g transform={`translate(${x}, ${y})`}>
    <text class="label">{label}</text>
    <text y="28" class="stat">{value}</text>
    <text y="45" class="date">{subValue}</text>
  </g>
)

export function GitHubStreakSVG({ 
  stats, 
  last7, 
  maxCount, 
  theme = 'transparent',
  lastUpdated
}: { 
  stats: StreakStats, 
  last7: GitHubContributionDay[], 
  maxCount: number, 
  theme: Theme,
  lastUpdated?: string
}) {
  const width = 420
  const height = 180
  const padding = 25
  const t = themes[theme] || themes.dark
  const dayLabels = last7.map(d => new Date(d.date).toLocaleDateString("en", { weekday: "short" })[0])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
        .label { font: bold 10px sans-serif; fill: ${t.textMuted}; text-transform: uppercase; letter-spacing: 1px; }
        .stat { font: bold 22px sans-serif; fill: ${t.text}; }
        .date { font: 10px sans-serif; fill: ${t.textMuted}; }
        .day { font: 9px sans-serif; fill: #ffffff; }
        .count { font: bold 11px sans-serif; fill: #ffffff; }
        .last-updated { font: 8px sans-serif; fill: ${t.textMuted}; opacity: 0.6; }
        `}
      </style>
      
      {t.bg !== 'none' && <rect width={width} height={height} rx="20" fill={t.bg}/>}
      {t.border !== 'none' && <rect x="0.5" y="0.5" width={width - 1} height={height - 1} rx="19.5" stroke={t.border}/>}

      {/* Stats row */}
      <StatItem 
        label="Current Streak" 
        value={`🔥 ${stats.current.count}`} 
        subValue={
          (() => {
            if (!stats.current.start || !stats.current.end) return '---'
            const startYear = stats.current.start.split('-')[0]
            const endYear = stats.current.end.split('-')[0]
            if (startYear && endYear && startYear !== endYear) {
              return `${formatFullDate(stats.current.start)} - ${formatFullDate(stats.current.end)}`
            }
            return `${formatShortDate(stats.current.start)} - ${formatShortDate(stats.current.end)}`
          })()
        } 
        x={padding} 
        y={40} 
      />

      <StatItem 
        label="Personal Best" 
        value={`🏆 ${stats.max.count}`} 
        subValue={`${formatFullDate(stats.max.start)} - ${formatFullDate(stats.max.end)}`} 
        x={width / 2 - 50} 
        y={40} 
      />

      <StatItem 
        label="Total Contribs" 
        value={`✨ ${formatNumber(stats.total)}+`} 
        subValue={stats.yearRange || '---'} 
        x={width - padding - 105} 
        y={40} 
      />

      {/* Separators */}
      <line x1={width / 2 - 65} y1="40" x2={width / 2 - 65} y2="85" stroke={theme === 'transparent' ? '#00000010' : t.border} stroke-width="1" />
      <line x1={width / 2 + 75} y1="40" x2={width / 2 + 75} y2="85" stroke={theme === 'transparent' ? '#00000010' : t.border} stroke-width="1" />

      {/* Heat Strip */}
      <g transform={`translate(${padding}, 110)`}>
        {last7.map((d, i) => {
          const rectW = (width - 2 * padding - 6 * 8) / 7
          const x = i * (rectW + 8)
          const color = getIntensityColor(d.contributionCount, maxCount)
          return (
            <g transform={`translate(${x}, 0)`} key={d.date}>
              <rect width={rectW} height="40" rx="6" fill={color}/>
              <text x={rectW / 2} y="11" class="day" text-anchor="middle" dominant-baseline="central" opacity="0.8">{dayLabels[i]}</text>
              <text x={rectW / 2} y="30" class="count" text-anchor="middle" dominant-baseline="central">{d.contributionCount}</text>
            </g>
          )
        })}
      </g>

      {lastUpdated && (
        <text x={width - padding} y={height - 10} text-anchor="end" class="last-updated">
          Last Updated: {lastUpdated}
        </text>
      )}
    </svg>
  )
}
