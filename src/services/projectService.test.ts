import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getProjects, getProjectsWithFallback } from '@/services/projectService'
import type { Project } from '@/types'

// Mock the github module
vi.mock('@/lib/github', () => ({
  getUserPagesRepos: vi.fn(),
  transformToProject: vi.fn((repo) => ({
    id: repo.id.toString(),
    title: repo.name,
    description: repo.description ?? '',
    url: repo.homepage ?? repo.html_url,
    githubUrl: repo.html_url,
    imageUrl: `https://raw.githubusercontent.com/user/${repo.name}/main/social-preview.png`,
    topics: repo.topics,
    stars: repo.stargazers_count,
    lastUpdated: repo.updated_at,
  })),
  sortProjectsAlphabetically: vi.fn((projects) => 
    [...projects].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
  ),
}))

import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'

const mockRepos = [
  {
    id: 1,
    name: 'zebra-project',
    description: 'A project starting with Z',
    html_url: 'https://github.com/user/zebra-project',
    has_pages: true,
    homepage: 'https://user.github.io/zebra-project',
    topics: ['react'],
    stargazers_count: 10,
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'alpha-project',
    description: 'A project starting with A',
    html_url: 'https://github.com/user/alpha-project',
    has_pages: true,
    homepage: 'https://user.github.io/alpha-project',
    topics: ['nextjs'],
    stargazers_count: 50,
    updated_at: '2024-01-10T08:00:00Z',
  },
]

const mockProjects: Project[] = [
  { id: 'mock-1', title: 'Mock Z', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
  { id: 'mock-2', title: 'Mock A', description: '', url: '', githubUrl: '', imageUrl: '', topics: [], stars: 0, lastUpdated: '' },
]

describe('projectService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getProjects', () => {
    it('should fetch repos and transform to sorted projects', async () => {
      vi.mocked(getUserPagesRepos).mockResolvedValue(mockRepos as any)

      const projects = await getProjects('fake-token')

      expect(getUserPagesRepos).toHaveBeenCalledWith('fake-token')
      expect(transformToProject).toHaveBeenCalledTimes(2)
      expect(sortProjectsAlphabetically).toHaveBeenCalled()
      expect(projects[0].title).toBe('alpha-project')
      expect(projects[1].title).toBe('zebra-project')
    })
  })

  describe('getProjectsWithFallback', () => {
    it('should return mock data when token is undefined', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const projects = await getProjectsWithFallback(undefined, mockProjects)

      expect(consoleSpy).toHaveBeenCalledWith('GITHUB_TOKEN is not set. Using mock data.')
      expect(getUserPagesRepos).not.toHaveBeenCalled()
      expect(projects[0].title).toBe('Mock A')
      expect(projects[1].title).toBe('Mock Z')

      consoleSpy.mockRestore()
    })

    it('should fetch real data when token is provided', async () => {
      vi.mocked(getUserPagesRepos).mockResolvedValue(mockRepos as any)

      const projects = await getProjectsWithFallback('real-token', mockProjects)

      expect(getUserPagesRepos).toHaveBeenCalledWith('real-token')
      expect(projects.length).toBe(2)
    })

    it('should return mock data when API call fails', async () => {
      vi.mocked(getUserPagesRepos).mockRejectedValue(new Error('API Error'))
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const projects = await getProjectsWithFallback('bad-token', mockProjects)

      expect(consoleSpy).toHaveBeenCalled()
      expect(projects[0].title).toBe('Mock A')
      expect(projects[1].title).toBe('Mock Z')

      consoleSpy.mockRestore()
    })
  })
})
