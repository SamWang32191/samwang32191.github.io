/**
 * Project type used internally in the application.
 * This is the normalized format used by UI components.
 */
export interface Project {
  id: string
  title: string
  description: string
  url: string
  githubUrl: string
  imageUrl: string
  topics: string[]
  stars: number
  lastUpdated: string
}
