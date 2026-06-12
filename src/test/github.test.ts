import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'
import type { GitHubRepo } from '@/types/github'
import type { Project } from '@/types'

const mockRepoWithPages: GitHubRepo = {
  id: 1,
  name: 'repo-with-pages',
  ownerLogin: 'SamWang32191',
  description: 'A repo with pages',
  html_url: 'https://github.com/SamWang32191/repo-with-pages',
  has_pages: true,
  homepage: 'https://samwang32191.github.io/repo-with-pages/',
  topics: ['nextjs', 'portfolio'],
  stargazers_count: 42,
  updated_at: '2024-01-15T10:30:00Z',
}

const mockRepoWithoutPages: GitHubRepo = {
  id: 2,
  name: 'repo-without-pages',
  ownerLogin: 'SamWang32191',
  description: 'A repo without pages',
  html_url: 'https://github.com/SamWang32191/repo-without-pages',
  has_pages: false,
  homepage: null,
  topics: [],
  stargazers_count: 5,
  updated_at: '2024-01-10T08:00:00Z',
}

const mockRepoHidden: GitHubRepo = {
  id: 3,
  name: 'hidden-repo',
  ownerLogin: 'SamWang32191',
  description: 'A hidden repo',
  html_url: 'https://github.com/SamWang32191/hidden-repo',
  has_pages: true,
  homepage: 'https://samwang32191.github.io/hidden-repo/',
  topics: ['hidden-from-hub', 'private'],
  stargazers_count: 10,
  updated_at: '2024-01-12T12:00:00Z',
}

type MockApiRepo = GitHubRepo & {
  readonly owner: {
    readonly login: string
  }
}

const toApiRepo = (repo: GitHubRepo): MockApiRepo => ({
  ...repo,
  owner: {
    login: repo.ownerLogin,
  },
})

const userPagesRepo: MockApiRepo = {
  ...toApiRepo({
    id: 4,
    name: 'SamWang32191.github.io',
    ownerLogin: 'SamWang32191',
    description: 'Root site',
    html_url: 'https://github.com/SamWang32191/SamWang32191.github.io',
    has_pages: true,
    homepage: null,
    topics: ['nextjs'],
    stargazers_count: 3,
    updated_at: '2024-01-16T10:30:00Z',
  }),
}

const orgPagesRepo: MockApiRepo = {
  ...toApiRepo({
    id: 5,
    name: 'org-pages',
    ownerLogin: 'OtherOrg',
    description: 'An org repo with pages',
    html_url: 'https://github.com/OtherOrg/org-pages',
    has_pages: true,
    homepage: null,
    topics: [],
    stargazers_count: 1,
    updated_at: '2024-01-17T10:30:00Z',
  }),
}

const mockPaginate = vi.fn()

vi.mock('octokit', () => {
  return {
    Octokit: vi.fn().mockImplementation(function () {
      return {
        paginate: mockPaginate,
        rest: {
          repos: {
            listForUser: vi.fn(),
          },
        },
      }
    }),
  }
})

describe('getUserPagesRepos', () => {
  beforeEach(() => {
    mockPaginate.mockResolvedValue([
      toApiRepo(mockRepoWithPages),
      toApiRepo(mockRepoWithoutPages),
      toApiRepo(mockRepoHidden),
      userPagesRepo,
      orgPagesRepo,
    ])
  })

  it('should fetch only repos with pages enabled', async () => {
    const repos = await getUserPagesRepos()

    expect(repos.map(repo => repo.name)).toEqual(['repo-with-pages', 'SamWang32191.github.io'])
    expect(repos.every(repo => repo.has_pages)).toBe(true)
  })

  it('should request public repos for the configured user without requiring a token', async () => {
    await getUserPagesRepos()

    expect(mockPaginate).toHaveBeenCalledWith(expect.any(Function), {
      username: 'SamWang32191',
      per_page: 100,
      sort: 'updated',
    })
  })

  it('should exclude repos with hidden-from-hub topic', async () => {
    const repos = await getUserPagesRepos()

    const hiddenRepo = repos.find(r => r.name === 'hidden-repo')
    expect(hiddenRepo).toBeUndefined()
  })

  it('should exclude repos owned by organizations', async () => {
    const repos = await getUserPagesRepos()

    const orgRepo = repos.find(r => r.name === 'org-pages')
    expect(orgRepo).toBeUndefined()
  })

  it('should include topics, stars, and updated_at in the response', async () => {
    const repos = await getUserPagesRepos()

    expect(repos[0].topics).toEqual(['nextjs', 'portfolio'])
    expect(repos[0].stargazers_count).toBe(42)
    expect(repos[0].updated_at).toBe('2024-01-15T10:30:00Z')
  })

  it('should derive GitHub Pages URLs when the repo homepage field is empty', async () => {
    const repos = await getUserPagesRepos()

    expect(repos[0].homepage).toBe('https://samwang32191.github.io/repo-with-pages/')
    expect(repos[1].homepage).toBe('https://samwang32191.github.io/')
  })
})

describe('transformToProject', () => {
  it('should correctly transform GitHubRepo to Project', () => {
    const project = transformToProject(mockRepoWithPages)

    expect(project.id).toBe('1')
    expect(project.title).toBe('repo-with-pages')
    expect(project.description).toBe('A repo with pages')
    expect(project.url).toBe('https://samwang32191.github.io/repo-with-pages/')
    expect(project.githubUrl).toBe('https://github.com/SamWang32191/repo-with-pages')
    expect(project.imageUrl).toBe('https://opengraph.githubassets.com/1/SamWang32191/repo-with-pages')
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
    expect(project.url).toBe('https://github.com/SamWang32191/repo-with-pages')
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
