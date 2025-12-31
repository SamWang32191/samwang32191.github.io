import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProjectCard from './ProjectCard'
import { Project } from '@/types'

const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    url: 'https://example.com',
    githubUrl: 'https://github.com/example/test',
    imageUrl: 'https://example.com/image.png',
    topics: ['nextjs', 'react', 'typescript'],
    stars: 42,
    lastUpdated: new Date().toISOString(), // Today
}

describe('ProjectCard', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2024-12-31T12:00:00Z'))
    })

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

    it('displays topic tags', () => {
        render(<ProjectCard project={mockProject} />)

        expect(screen.getByText('nextjs')).toBeInTheDocument()
        expect(screen.getByText('react')).toBeInTheDocument()
        expect(screen.getByText('typescript')).toBeInTheDocument()
    })

    it('limits displayed topics and shows count for remaining', () => {
        const projectWithManyTopics: Project = {
            ...mockProject,
            topics: ['one', 'two', 'three', 'four', 'five', 'six'],
        }

        render(<ProjectCard project={projectWithManyTopics} />)

        expect(screen.getByText('one')).toBeInTheDocument()
        expect(screen.getByText('two')).toBeInTheDocument()
        expect(screen.getByText('three')).toBeInTheDocument()
        expect(screen.getByText('four')).toBeInTheDocument()
        expect(screen.queryByText('five')).not.toBeInTheDocument()
        expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('displays star count', () => {
        render(<ProjectCard project={mockProject} />)

        expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('displays relative date for lastUpdated', () => {
        const projectUpdatedYesterday: Project = {
            ...mockProject,
            lastUpdated: '2024-12-30T12:00:00Z',
        }

        render(<ProjectCard project={projectUpdatedYesterday} />)

        expect(screen.getByText('Yesterday')).toBeInTheDocument()
    })

    it('handles empty topics gracefully', () => {
        const projectWithoutTopics: Project = {
            ...mockProject,
            topics: [],
        }

        render(<ProjectCard project={projectWithoutTopics} />)

        // Should not crash and should still render the card
        expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

    it('uses fallback image when the primary imageUrl fails to load', () => {
        render(<ProjectCard project={mockProject} />)

        const img = screen.getByAltText(mockProject.title)

        // Trigger error event
        fireEvent.error(img)

        // Verify it switches to a fallback URL
        expect(img).toHaveAttribute('src', expect.stringContaining('unsplash.com'))
    })
})
