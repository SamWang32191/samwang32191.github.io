import { Octokit } from 'octokit'
import { Project } from '@/types'
import { GitHubRepo } from '@/types/github'

// Re-export the GitHubRepo type for external use
export type { GitHubRepo }

/**
 * Fetches repositories for the authenticated user and filters for those with GitHub Pages enabled.
 * Excludes repositories with the 'hidden-from-hub' topic.
 */
export async function getUserPagesRepos(token: string): Promise<GitHubRepo[]> {
  const octokit = new Octokit({ auth: token })
  
  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: 'updated',
  })
  
  // Filter and map to our internal interface
  return data
    .filter(repo => repo.has_pages)
    .filter(repo => !repo.topics?.includes('hidden-from-hub'))
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      has_pages: repo.has_pages ?? false,
      homepage: repo.homepage,
      topics: repo.topics ?? [],
      stargazers_count: repo.stargazers_count ?? 0,
      updated_at: repo.updated_at ?? new Date().toISOString(),
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
    topics: repo.topics,
    stars: repo.stargazers_count,
    lastUpdated: repo.updated_at,
  }
}

/**
 * Sorts projects alphabetically by title (A-Z).
 */
export function sortProjectsAlphabetically(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => 
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  )
}
