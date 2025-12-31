import { Project } from '@/types'
import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'

/**
 * Fetches and transforms GitHub repositories into Project objects.
 * This service integrates the API client with data transformation logic.
 * 
 * @param token - GitHub Personal Access Token
 * @returns Array of Project objects, sorted alphabetically by title
 */
export async function getProjects(token: string): Promise<Project[]> {
  const repos = await getUserPagesRepos(token)
  const projects = repos.map(transformToProject)
  return sortProjectsAlphabetically(projects)
}

/**
 * Fetches projects or returns mock data if token is unavailable.
 * This is the main entry point for the homepage.
 * 
 * @param token - Optional GitHub Personal Access Token
 * @param mockProjects - Fallback mock projects if token is unavailable or API fails
 * @returns Array of Project objects
 */
export async function getProjectsWithFallback(
  token: string | undefined,
  mockProjects: Project[]
): Promise<Project[]> {
  if (!token) {
    console.warn('GITHUB_TOKEN is not set. Using mock data.')
    return sortProjectsAlphabetically(mockProjects)
  }

  try {
    return await getProjects(token)
  } catch (error) {
    console.error('Failed to fetch projects from GitHub:', error)
    return sortProjectsAlphabetically(mockProjects)
  }
}
