import { GitHubContributionDay, GitHubResponse } from './types'

const GITHUB_GRAPHQL_QUERY = `
query($login:String!) {
  user(login:$login) {
    contributionsCollection {
      contributionYears
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`

const YEAR_QUERY = `
query($login:String!, $from:DateTime!, $to:DateTime!) {
  user(login:$login) {
    contributionsCollection(from:$from, to:$to) {
      contributionCalendar {
        totalContributions
      }
    }
  }
}`

export async function fetchGitHubData(username: string, token: string): Promise<{ days: GitHubContributionDay[], totalContributions: number }> {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
    "User-Agent": "Streak-Pulse-Worker"
  }

  // Initial fetch to get the current calendar and the list of contribution years
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: GITHUB_GRAPHQL_QUERY,
      variables: { login: username }
    })
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`)
  }

  const json = (await res.json()) as any
  if (!json.data?.user) {
    throw new Error(`User ${username} not found`)
  }

  const user = json.data.user
  const currentCalendar = user.contributionsCollection.contributionCalendar
  const years: number[] = user.contributionsCollection.contributionYears
  
  // The first year in the list is the current one, which we already have
  let grandTotal = currentCalendar.totalContributions

  // Fetch totals for the other years
  // We skip years[0] because that's usually the current period already covered
  // but wait, GraphQL years might overlap or be strictly calendar years.
  // Actually, contributionCalendar.totalContributions in the first call is for the LAST 365 DAYS.
  // The contributionYears are usually calendar years like 2024, 2023, etc.
  
  // Better approach: Fetch all years strictly.
  const yearTotals = await Promise.all(years.map(async (year) => {
    const from = `${year}-01-01T00:00:00Z`
    const to = `${year}-12-31T23:59:59Z`
    
    const yres = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: YEAR_QUERY,
        variables: { login: username, from, to }
      })
    })
    
    if (yres.ok) {
      const yjson = await yres.json() as any
      return yjson.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
    }
    return 0
  }))

  const allTimeTotal = yearTotals.reduce((a, b) => a + b, 0)

  return {
    days: currentCalendar.weeks.flatMap((w: any) => w.contributionDays),
    totalContributions: allTimeTotal,
    contributionYears: years
  }
}
