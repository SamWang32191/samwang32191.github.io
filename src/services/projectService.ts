import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'
import type { Project } from '@/types'

/**
 * Fetches and transforms GitHub repositories into Project objects.
 * This service integrates the API client with data transformation logic.
 * 
 * @param token - Optional GitHub Personal Access Token for higher API limits
 * @returns Array of Project objects, sorted alphabetically by title
 */
export async function getProjects(token?: string): Promise<Project[]> {
  const repos = await getUserPagesRepos(token)
  const projects = repos.map(transformToProject)
  return sortProjectsAlphabetically(projects)
}

/**
 * Fetches projects or returns mock data if the GitHub API is unavailable.
 * This is the main entry point for the homepage.
 * 
 * @param token - Optional GitHub Personal Access Token for higher API limits
 * @param mockProjects - Fallback mock projects if the API fails
 * @returns Array of Project objects
 */
export async function getProjectsWithFallback(
  token: string | undefined,
  mockProjects: Project[]
): Promise<Project[]> {
  try {
    return await getProjects(token)
  } catch (error) {
    console.error('Failed to fetch projects from GitHub:', error)
    return sortProjectsAlphabetically(mockProjects)
  }
}
