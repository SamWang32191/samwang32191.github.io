import ProjectCard from '@/components/ProjectCard'
import { getUserPagesRepos, transformToProject, sortProjectsAlphabetically } from '@/lib/github'
import { Project } from '@/types'

// Mock projects for preview fallback
const MOCK_PROJECTS: Project[] = [
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

async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.warn('GITHUB_TOKEN is not set. Using mock data.')
    return sortProjectsAlphabetically(MOCK_PROJECTS)
  }

  try {
    const repos = await getUserPagesRepos(token)
    const projects = repos.map(transformToProject)
    return sortProjectsAlphabetically(projects)
  } catch (error) {
    console.error('Failed to fetch projects from GitHub:', error)
    return sortProjectsAlphabetically(MOCK_PROJECTS)
  }
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className="space-y-16">
      <section className="py-12 md:py-24 text-center space-y-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Building the <span className="text-gradient">Future</span> of Web Experiences
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Welcome to my digital workshop. I'm a developer passionate about creating
          stunning, high-performance web applications that leave a lasting impression.
        </p>
        <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <button className="px-8 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-colors">
            Contact Me
          </button>
        </div>
      </section>

      <section id="projects" className="space-y-8">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h3 className="text-2xl font-bold">Featured Projects</h3>
            <p className="text-muted-foreground">
              {process.env.GITHUB_TOKEN ? 'Automatically fetched from GitHub Pages' : 'Demonstration projects (Mock Data)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
