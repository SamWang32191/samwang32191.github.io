import { Octokit } from 'octokit'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  has_pages: boolean
  homepage: string | null
}

/**
 * Fetches repositories for the authenticated user and filters for those with GitHub Pages enabled.
 */
export async function getUserPagesRepos(token: string): Promise<GitHubRepo[]> {
  const octokit = new Octokit({ auth: token })
  
  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: 'updated',
  })
  
  // Explicitly mapping and filtering to match our internal interface and requirements
  return data
    .filter(repo => repo.has_pages)
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      has_pages: repo.has_pages ?? false,
      homepage: repo.homepage,
    }))
}
