import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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
    // Mock window.open
    const openMock = vi.fn()

    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2024-12-31T12:00:00Z'))
        vi.stubGlobal('open', openMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        openMock.mockReset()
    })

    it('renders project title and description', () => {
        render(<ProjectCard project={mockProject} />)

        expect(screen.getByText('Test Project')).toBeInTheDocument()
        expect(screen.getByText('A test project description')).toBeInTheDocument()
    })

    // NEW TEST: Verify "Visit Site" link is removed
    it('does NOT contain the "Visit Site" text link', () => {
        render(<ProjectCard project={mockProject} />)
        expect(screen.queryByText(/visit site/i)).not.toBeInTheDocument()
    })

    // NEW TEST: Verify clicking the card navigates to project url
    it('navigates to project url when card body is clicked', () => {
        render(<ProjectCard project={mockProject} />)
        
        const cardTitle = screen.getByText('Test Project')
        fireEvent.click(cardTitle)

        expect(openMock).toHaveBeenCalledWith(mockProject.url, '_blank', 'noopener,noreferrer')
    })

    // NEW TEST: Verify clicking the image navigates to project url
    it('navigates to project url when card image is clicked', () => {
        render(<ProjectCard project={mockProject} />)
        
        // Image is usually accessed by alt text
        // Note: In Next.js Image, the alt text is on the img tag.
        // We might need to click the wrapper or the image itself.
        const image = screen.getByAltText(mockProject.title)
        fireEvent.click(image)

        expect(openMock).toHaveBeenCalledWith(mockProject.url, '_blank', 'noopener,noreferrer')
    })

    // NEW TEST: Verify GitHub link works and stops propagation
    it('contains link to github and does not trigger card navigation when clicked', () => {
        render(<ProjectCard project={mockProject} />)

        const githubLink = screen.getByRole('link', { name: /view on github/i })
        expect(githubLink).toHaveAttribute('href', mockProject.githubUrl)
        
        // Clicking the GitHub link should NOT trigger the card's onClick
        fireEvent.click(githubLink)
        
        // The window.open mock should NOT be called for the project URL because propagation should be stopped
        // (Assuming the GitHub link is a standard anchor tag, JSDOM handles the click event)
        // However, standard anchor tag click in JSDOM doesn't actually navigate.
        // But if we have an onClick handler on the parent, the event bubbles up.
        // We want to ensure that the bubble is stopped.
        expect(openMock).not.toHaveBeenCalled()
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

    it('does NOT display star count', () => {
        render(<ProjectCard project={mockProject} />)

        expect(screen.queryByText('42')).not.toBeInTheDocument()
        // Also ensure the star icon is gone if possible, but identifying by text is a good start. 
        // We can search for the title "Stars" on the span wrapper if we want to be more specific.
        expect(screen.queryByTitle('Stars')).not.toBeInTheDocument()
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

        expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

        it('uses fallback image when the primary imageUrl fails to load', () => {

            render(<ProjectCard project={mockProject} />)

    

            const img = screen.getByAltText(mockProject.title)

            fireEvent.error(img)

            expect(img).toHaveAttribute('src', expect.stringContaining('unsplash.com'))

        })

    

        // NEW TEST: Accessibility and Tooltips

        it('has appropriate aria-labels and tooltips', () => {

            render(<ProjectCard project={mockProject} />)

    

            const card = screen.getByRole('button', { name: /visit website/i }) || screen.getByLabelText(/visit website/i)

            expect(card).toBeInTheDocument()

            expect(card).toHaveAttribute('title', 'Visit Website')

    

            const githubLink = screen.getByRole('link', { name: /view on github/i })

            expect(githubLink).toBeInTheDocument()

            expect(githubLink).toHaveAttribute('title', 'View Code')

        })

    })

    