import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectCard from './ProjectCard'
import { Project } from '@/types'

const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    url: 'https://example.com',
    githubUrl: 'https://github.com/example/test',
    imageUrl: 'https://example.com/image.png',
    topics: ['nextjs', 'react'],
    stars: 25,
    lastUpdated: '2024-01-15T10:30:00Z',
}

describe('ProjectCard', () => {
    it('renders project title and description', () => {
        render(<ProjectCard project={mockProject} />)

        expect(screen.getByText('Test Project')).toBeInTheDocument()
        expect(screen.getByText('A test project description')).toBeInTheDocument()
    })

    it('contains links to project and github', () => {
        render(<ProjectCard project={mockProject} />)

        const githubLink = screen.getByRole('link', { name: /view on github/i })
        expect(githubLink).toHaveAttribute('href', mockProject.githubUrl)
    })
})
