import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'
import type { GitHubRepo } from '@/types/github'
import type { Project } from '@/types'

// Mock data
const mockRepoWithPages: GitHubRepo = {
  id: 1,
  name: 'repo-with-pages',
  description: 'A repo with pages',
  html_url: 'https://github.com/user/repo-with-pages',
  has_pages: true,
  homepage: 'https://user.github.io/repo-with-pages',
  topics: ['nextjs', 'portfolio'],
  stargazers_count: 42,
  updated_at: '2024-01-15T10:30:00Z',
}

const mockRepoWithoutPages: GitHubRepo = {
  id: 2,
  name: 'repo-without-pages',
  description: 'A repo without pages',
  html_url: 'https://github.com/user/repo-without-pages',
  has_pages: false,
  homepage: null,
  topics: [],
  stargazers_count: 5,
  updated_at: '2024-01-10T08:00:00Z',
}

const mockRepoHidden: GitHubRepo = {
  id: 3,
  name: 'hidden-repo',
  description: 'A hidden repo',
  html_url: 'https://github.com/user/hidden-repo',
  has_pages: true,
  homepage: 'https://user.github.io/hidden-repo',
  topics: ['hidden-from-hub', 'private'],
  stargazers_count: 10,
  updated_at: '2024-01-12T12:00:00Z',
}

// Mock Octokit
vi.mock('octokit', () => {
  return {
    Octokit: vi.fn().mockImplementation(function () {
      return {
        rest: {
          repos: {
            listForAuthenticatedUser: vi.fn().mockResolvedValue({
              data: [
                {
                  ...mockRepoWithPages,
                  has_pages: true,
                },
                {
                  ...mockRepoWithoutPages,
                  has_pages: false,
                },
                {
                  ...mockRepoHidden,
                  has_pages: true,
                  topics: ['hidden-from-hub', 'private'],
                }
              ]
            })
          }
        }
      }
    })
  }
})

describe('getUserPagesRepos', () => {
  it('should fetch only repos with pages enabled', async () => {
    const repos = await getUserPagesRepos('fake-token')

    expect(repos).toHaveLength(1)
    expect(repos[0].name).toBe('repo-with-pages')
    expect(repos[0].has_pages).toBe(true)
  })

  it('should exclude repos with hidden-from-hub topic', async () => {
    const repos = await getUserPagesRepos('fake-token')

    const hiddenRepo = repos.find(r => r.name === 'hidden-repo')
    expect(hiddenRepo).toBeUndefined()
  })

  it('should include topics, stars, and updated_at in the response', async () => {
    const repos = await getUserPagesRepos('fake-token')

    expect(repos[0].topics).toEqual(['nextjs', 'portfolio'])
    expect(repos[0].stargazers_count).toBe(42)
    expect(repos[0].updated_at).toBe('2024-01-15T10:30:00Z')
  })
})

describe('transformToProject', () => {
  it('should correctly transform GitHubRepo to Project', () => {
    const project = transformToProject(mockRepoWithPages)

    expect(project.id).toBe('1')
    expect(project.title).toBe('repo-with-pages')
    expect(project.description).toBe('A repo with pages')
    expect(project.url).toBe('https://user.github.io/repo-with-pages')
    expect(project.githubUrl).toBe('https://github.com/user/repo-with-pages')
    expect(project.imageUrl).toBe('https://opengraph.githubassets.com/1/user/repo-with-pages')
  })

  it('should include topics, stars, and lastUpdated in the Project', () => {
    const project = transformToProject(mockRepoWithPages)

    expect(project.topics).toEqual(['nextjs', 'portfolio'])
    expect(project.stars).toBe(42)
    expect(project.lastUpdated).toBe('2024-01-15T10:30:00Z')
  })

  it('should use html_url as fallback when homepage is null', () => {
    const repoWithoutHomepage: GitHubRepo = {
      ...mockRepoWithPages,
      homepage: null,
    }

    const project = transformToProject(repoWithoutHomepage)
    expect(project.url).toBe('https://github.com/user/repo-with-pages')
  })

  it('should handle null description', () => {
    const repoWithNullDesc: GitHubRepo = {
      ...mockRepoWithPages,
      description: null,
    }

    const project = transformToProject(repoWithNullDesc)
    expect(project.description).toBe('')
  })
})

describe('sortProjectsAlphabetically', () => {
  it('should sort projects by title alphabetically (A-Z)', () => {
    const projects: Project[] = [
      { id: '1', title: 'Zebra Project', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
      { id: '2', title: 'Alpha Project', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
      { id: '3', title: 'Mango Project', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
    ]

    const sorted = sortProjectsAlphabetically(projects)

    expect(sorted[0].title).toBe('Alpha Project')
    expect(sorted[1].title).toBe('Mango Project')
    expect(sorted[2].title).toBe('Zebra Project')
  })

  it('should be case-insensitive when sorting', () => {
    const projects: Project[] = [
      { id: '1', title: 'banana', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
      { id: '2', title: 'Apple', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
      { id: '3', title: 'Cherry', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
    ]

    const sorted = sortProjectsAlphabetically(projects)

    expect(sorted[0].title).toBe('Apple')
    expect(sorted[1].title).toBe('banana')
    expect(sorted[2].title).toBe('Cherry')
  })

  it('should not mutate the original array', () => {
    const projects: Project[] = [
      { id: '1', title: 'Z', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
      { id: '2', title: 'A', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
    ]

    const sorted = sortProjectsAlphabetically(projects)

    expect(projects[0].title).toBe('Z')
    expect(sorted[0].title).toBe('A')
  })
})
