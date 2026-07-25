export type Bindings = {
  GITHUB_TOKEN: string
}

export type GitHubContributionDay = {
  date: string
  contributionCount: number
}

export type GitHubProfile = {
  name?: string
  avatarUrl?: string
  bio?: string
  company?: string
  location?: string
  websiteUrl?: string
  twitterUsername?: string
  email?: string
  followers?: number
  following?: number
  repositories?: number
}

export type GitHubResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: GitHubContributionDay[]
          }[]
        }
      }
    }
  }
}

export type Theme = 'light' | 'dark' | 'transparent'
