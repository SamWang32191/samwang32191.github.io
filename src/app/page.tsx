import ProjectCard from '@/components/ProjectCard'
import { getProjectsWithFallback } from '@/services/projectService'
import { MOCK_PROJECTS } from '@/data/mockProjects'

export default async function Home() {
  const projects = await getProjectsWithFallback(process.env.GITHUB_TOKEN, MOCK_PROJECTS)

  return (
    <div className="space-y-16">
      <section id="projects" className="space-y-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
