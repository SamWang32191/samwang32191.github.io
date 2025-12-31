import { Project } from '@/types'
import Image from 'next/image'

interface ProjectCardProps {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    unoptimized // Use unoptimized for raw.githubusercontent.com images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-sm font-medium underline underline-offset-4"
                    >
                        Visit Site
                    </a>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {project.description || 'No description provided.'}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity"
                    >
                        <span>View on GitHub</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
