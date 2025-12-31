import { Project } from '@/types'

/**
 * Mock projects used as fallback when GitHub API is unavailable.
 * These serve as demo data for preview purposes.
 */
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-1',
    title: 'Modern Portfolio',
    description: 'A premium portfolio template built with Next.js 15 and Tailwind CSS v4 featuring glassmorphism.',
    url: 'https://github.com/samwang32191/samwang32191.github.io',
    githubUrl: 'https://github.com/samwang32191/samwang32191.github.io',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    topics: ['nextjs', 'portfolio', 'tailwindcss'],
    stars: 42,
    lastUpdated: '2024-12-31T10:00:00Z',
  },
  {
    id: 'mock-2',
    title: 'GitHub Pages Explorer',
    description: 'Auto-discover and showcase all your GitHub Pages projects with optimized social previews.',
    url: 'https://github.com/samwang32191',
    githubUrl: 'https://github.com/samwang32191',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    topics: ['github', 'automation'],
    stars: 15,
    lastUpdated: '2024-12-30T08:00:00Z',
  },
]
