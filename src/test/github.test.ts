import { describe, it, expect, vi } from 'vitest'
import { getUserPagesRepos, transformToProject } from '@/lib/github'

// Mock Octokit
vi.mock('octokit', () => {
  return {
    Octokit: vi.fn().mockImplementation(function() {
      return {
        rest: {
          repos: {
            listForAuthenticatedUser: vi.fn().mockResolvedValue({
              data: [
                {
                  id: 1,
                  name: 'repo-with-pages',
                  description: 'A repo with pages',
                  html_url: 'https://github.com/user/repo-with-pages',
                  has_pages: true,
                  homepage: 'https://user.github.io/repo-with-pages',
                },
                {
                  id: 2,
                  name: 'repo-without-pages',
                  description: 'A repo without pages',
                  html_url: 'https://github.com/user/repo-without-pages',
                  has_pages: false,
                  homepage: null,
                }
              ]
            })
          }
        }
      }
    })
  }
})

describe('github lib', () => {
  it('should fetch only repos with pages enabled', async () => {
    const repos = await getUserPagesRepos('fake-token')
    
    expect(repos).toHaveLength(1)
    expect(repos[0].name).toBe('repo-with-pages')
    expect(repos[0].has_pages).toBe(true)
  })

  it('should correctly transform GitHubRepo to Project', () => {
    const mockRepo = {
      id: 1,
      name: 'my-cool-project',
      description: 'A description',
      html_url: 'https://github.com/user/my-cool-project',
      has_pages: true,
      homepage: 'https://user.github.io/my-cool-project',
    }

    const project = transformToProject(mockRepo)

    expect(project.id).toBe('1')
    expect(project.title).toBe('my-cool-project')
    expect(project.description).toBe('A description')
    expect(project.url).toBe('https://user.github.io/my-cool-project')
    expect(project.githubUrl).toBe('https://github.com/user/my-cool-project')
    expect(project.imageUrl).toBe('https://raw.githubusercontent.com/user/my-cool-project/main/social-preview.png')
  })
})
