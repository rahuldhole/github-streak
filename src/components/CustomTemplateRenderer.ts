import { GitHubContributionDay, Theme } from '../types.ts'
import { getIntensityColor, StreakStats } from '../logic.ts'
import { themes } from './GitHubStreakSVG.tsx'

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

function getCustomIntensityColor(count: number, maxCount: number): string {
  const colors = ["#1e293b14", "#0e4429ff", "#006d32ff", "#26a641ff", "#39d353ff"];
  if (count === 0) return colors[0]
  const ratio = count / Math.max(maxCount, 1)

  if (ratio >= 0.75) return colors[4]
  if (ratio >= 0.5) return colors[3]
  if (ratio >= 0.25) return colors[2]
  return colors[1]
}

function getCustomTextColor(count: number, maxCount: number, theme: Theme): string {
  const ratio = count / Math.max(maxCount, 1);
  const emptyText = theme === 'light' ? '#24292f' : '#c9d1d9';
  if (count === 0) return emptyText;
  
  if (ratio >= 0.5) return '#000000'; // Light greens
  return '#ffffff'; // Dark greens
}

function getIntensityLevel(count: number, maxCount: number): number {
  if (count === 0) return 0;
  const ratio = count / Math.max(maxCount, 1);
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.5) return 3;
  if (ratio >= 0.25) return 2;
  return 1;
}

export function renderCustomTemplate(
  template: string,
  stats: StreakStats,
  last7: GitHubContributionDay[],
  maxCount: number,
  theme: Theme = 'transparent',
  lastUpdated?: string
): string {
  const width = 420
  const padding = 25
  const t = themes[theme] || themes.dark
  const dayLabels = last7.map(d => new Date(d.date).toLocaleDateString("en", { weekday: "short" })[0])

  let currentStreakDate = '---'
  if (stats.current.start && stats.current.end) {
    const startYear = stats.current.start.split('-')[0]
    const endYear = stats.current.end.split('-')[0]
    if (startYear && endYear && startYear !== endYear) {
      currentStreakDate = `${formatFullDate(stats.current.start)} - ${formatFullDate(stats.current.end)}`
    } else {
      currentStreakDate = `${formatShortDate(stats.current.start)} - ${formatShortDate(stats.current.end)}`
    }
  }

  const heatStrip = last7.map((d, i) => {
    const rectW = (width - 2 * padding - 6 * 8) / 7
    const x = i * (rectW + 8)
    const color = getCustomIntensityColor(d.contributionCount, maxCount)
    return `
      <g transform="translate(${x}, 0)">
        <rect width="${rectW}" height="40" rx="6" fill="${color}"/>
        <text x="${rectW / 2}" y="11" class="day" text-anchor="middle" dominant-baseline="central" opacity="0.8">${dayLabels[i]}</text>
        <text x="${rectW / 2}" y="30" class="count" text-anchor="middle" dominant-baseline="central">${d.contributionCount}</text>
      </g>
    `
  }).join('')

  let result = template
    .replace(/{{currentStreak}}/g, stats.current.count.toString())
    .replace(/{{currentStreakDate}}/g, currentStreakDate)
    .replace(/{{personalBest}}/g, stats.max.count.toString())
    .replace(/{{personalBestDate}}/g, `${formatFullDate(stats.max.start)} - ${formatFullDate(stats.max.end)}`)
    .replace(/{{totalContribs}}/g, formatNumber(stats.total))
    .replace(/{{totalContribsDate}}/g, stats.yearRange || '---')
    .replace(/{{heatStrip}}/g, heatStrip)
    .replace(/{{lastUpdated}}/g, lastUpdated ? `Last Updated: ${lastUpdated}` : '')
    .replace(/{{theme\.bg}}/g, t.bg)
    .replace(/{{theme\.border}}/g, t.border)
    .replace(/{{theme\.text}}/g, t.text)
    .replace(/{{theme\.textMuted}}/g, t.textMuted)
    .replace(/{{theme\.accent}}/g, t.accent)

  // Add granular variables for advanced usage
  last7.forEach((d, i) => {
    const level = getIntensityLevel(d.contributionCount, maxCount)
    const color = getCustomIntensityColor(d.contributionCount, maxCount)
    const textColor = getCustomTextColor(d.contributionCount, maxCount, theme)
    result = result
      .replace(new RegExp(`{{day${i}Count}}`, 'g'), d.contributionCount.toString())
      .replace(new RegExp(`{{day${i}Color}}`, 'g'), color)
      .replace(new RegExp(`{{day${i}TextColor}}`, 'g'), textColor)
      .replace(new RegExp(`{{day${i}Label}}`, 'g'), dayLabels[i])
      .replace(new RegExp(`{{day${i}Level}}`, 'g'), level.toString())
  })

  return result
}
