import { GitHubContributionDay } from './types'

export function calculateStreak(days: GitHubContributionDay[]): number {
  if (days.length === 0) return 0
  
  const lastIndex = days.length - 1
  const today = days[lastIndex].contributionCount
  const yesterday = lastIndex > 0 ? days[lastIndex - 1].contributionCount : 0

  // A streak is broken if both today AND yesterday had no activity.
  // We allow today to be 0 for a grace period.
  if (today === 0 && yesterday === 0) return 0

  let streak = 0
  // Start counting from the most recent day that had activity (today or yesterday)
  const startAt = today > 0 ? lastIndex : lastIndex - 1

  for (let i = startAt; i >= 0; i--) {
    if (days[i].contributionCount > 0) {
      streak++
    } else {
      break
    }
  }
  return streak
}

export function getIntensityColor(count: number, maxCount: number): string {
  if (count === 0) return "#1e293b14"
  const ratio = count / Math.max(maxCount, 1)

  if (ratio >= 0.75) return "#0e8a3cff"
  if (ratio >= 0.5) return "#15af4eff"
  if (ratio >= 0.25) return "#35df73ff"
  return "#60ec91ff"
}
