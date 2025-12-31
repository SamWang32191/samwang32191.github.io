/**
 * GitHub Repository type as returned by the GitHub API.
 * This interface represents the data we need from the API response.
 */
export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  has_pages: boolean
  homepage: string | null
  topics: string[]
  stargazers_count: number
  updated_at: string
}
