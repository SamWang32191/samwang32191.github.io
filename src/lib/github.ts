import { Octokit } from 'octokit'
import { siteConfig } from '@/config/site'
import type { Project } from '@/types'
import type { GitHubRepo } from '@/types/github'

// Re-export the GitHubRepo type for external use
export type { GitHubRepo }

type ListForUserResponse = Awaited<ReturnType<Octokit['rest']['repos']['listForUser']>>
type GitHubApiRepo = ListForUserResponse['data'][number]

/**
 * Fetches repositories for the configured user and filters for those with GitHub Pages enabled.
 * Excludes repositories with the 'hidden-from-hub' topic.
 */
export async function getUserPagesRepos(token?: string): Promise<GitHubRepo[]> {
  const octokit = new Octokit(token ? { auth: token } : {})

  const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
    username: siteConfig.githubOwner,
    per_page: 100,
    sort: 'updated',
  })

  return repos
    .filter(isOwnedPagesRepo)
    .filter(repo => !repo.topics?.includes('hidden-from-hub'))
    .map((repo): GitHubRepo => ({
      id: repo.id,
      name: repo.name,
      ownerLogin: repo.owner.login,
      description: repo.description,
      html_url: repo.html_url,
      has_pages: repo.has_pages ?? false,
      homepage: getPagesUrl(repo),
      topics: repo.topics ?? [],
      stargazers_count: repo.stargazers_count ?? 0,
      updated_at: repo.updated_at ?? new Date().toISOString(),
    }))
}

function isOwnedPagesRepo(repo: GitHubApiRepo): boolean {
  return Boolean(repo.has_pages) && repo.owner.login.toLowerCase() === siteConfig.githubOwner.toLowerCase()
}

function getPagesUrl(repo: GitHubApiRepo): string {
  const isUserPagesRepo = repo.name.toLowerCase() === `${siteConfig.githubOwner.toLowerCase()}.github.io`

  if (isUserPagesRepo) {
    return `https://${siteConfig.pagesHost}/`
  }

  return `https://${siteConfig.pagesHost}/${repo.name}/`
}

/**
 * Transforms a GitHub repository object into the internal Project type.
 */
export function transformToProject(repo: GitHubRepo): Project {
  return {
    id: repo.id.toString(),
    title: repo.name,
    description: repo.description ?? '',
    url: repo.homepage ?? repo.html_url,
    githubUrl: repo.html_url,
    // Construct a predictable social preview URL using GitHub's Open Graph service
    imageUrl: `https://opengraph.githubassets.com/1/${repo.ownerLogin}/${repo.name}`,
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
