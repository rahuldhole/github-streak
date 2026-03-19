import { GitHubContributionDay } from './types'

export type StreakDetails = {

  count: number
  start: string
  end: string
}

export type StreakStats = {
  current: StreakDetails
  max: StreakDetails
  total: number
  yearRange: string
}

export function calculateStreakStats(days: GitHubContributionDay[], total: number = 0, years: number[] = []): StreakStats {
  const empty = { count: 0, start: '', end: '' }
  if (days.length === 0) return { current: empty, max: empty, total: 0, yearRange: '' }

  let streaks: StreakDetails[] = []
  let ongoingStart: string | null = null
  let ongoingCount = 0

  for (let i = 0; i < days.length; i++) {
    if (days[i].contributionCount > 0) {
      if (!ongoingStart) ongoingStart = days[i].date
      ongoingCount++
    } else if (ongoingStart) {
      streaks.push({ count: ongoingCount, start: ongoingStart, end: days[i - 1].date })
      ongoingStart = null
      ongoingCount = 0
    }
  }
  if (ongoingStart) {
    streaks.push({ count: ongoingCount, start: ongoingStart, end: days[days.length - 1].date })
  }

  // Find Max
  let max: StreakDetails = empty
  for (const s of streaks) {
    if (s.count >= max.count) max = s
  }

  // Determine current active streak
  const lastIdx = days.length - 1
  const todayVal = days[lastIdx].contributionCount
  const yestVal = lastIdx > 0 ? days[lastIdx - 1].contributionCount : 0
  
  let current: StreakDetails = empty
  if (todayVal > 0 || yestVal > 0) {
    const lastS = streaks[streaks.length - 1]
    if (lastS && (lastS.end === days[lastIdx].date || lastS.end === days[lastIdx-1].date)) {
      current = lastS
    }
  }

  const yearRange = years.length > 0 ? `${Math.min(...years)} - ${Math.max(...years)}` : ''
  return { current, max, total, yearRange }
}

export function getIntensityColor(count: number, maxCount: number): string {
  if (count === 0) return "#1e293b14"
  const ratio = count / Math.max(maxCount, 1)

  if (ratio >= 0.75) return "#0e8a3cff"
  if (ratio >= 0.5) return "#15af4eff"
  if (ratio >= 0.25) return "#35df73ff"
  return "#60ec91ff"
}
