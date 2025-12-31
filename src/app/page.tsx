import ProjectCard from '@/components/ProjectCard'
import { getProjectsWithFallback } from '@/services/projectService'
import { MOCK_PROJECTS } from '@/data/mockProjects'

export default async function Home() {
  const projects = await getProjectsWithFallback(process.env.GITHUB_TOKEN, MOCK_PROJECTS)

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
