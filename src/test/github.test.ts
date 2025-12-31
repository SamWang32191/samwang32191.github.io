import { describe, it, expect, vi } from 'vitest'
import { getUserPagesRepos } from '@/lib/github'

// Mock Octokit
vi.mock('octokit', () => {
  return {
    Octokit: vi.fn().mockImplementation(() => {
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
})
