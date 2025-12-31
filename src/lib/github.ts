import { Octokit } from 'octokit'
import { Project } from '@/types'

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

/**
 * Transforms a GitHub repository object into the internal Project type.
 */
export function transformToProject(repo: GitHubRepo): Project {
  // Extract owner and repo name from html_url or use a safe default
  const urlParts = repo.html_url.split('/')
  const owner = urlParts[urlParts.length - 2]
  const repoName = repo.name

  return {
    id: repo.id.toString(),
    title: repo.name,
    description: repo.description ?? '',
    url: repo.homepage ?? repo.html_url,
    githubUrl: repo.html_url,
    // Construct a predictable social preview URL if not provided
    imageUrl: `https://raw.githubusercontent.com/${owner}/${repoName}/main/social-preview.png`,
  }
}

