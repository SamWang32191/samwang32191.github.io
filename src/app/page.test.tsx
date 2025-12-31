import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './page'

// Mock the service
vi.mock('@/services/projectService', () => ({
    getProjectsWithFallback: vi.fn().mockResolvedValue([]),
}))

// Mock ProjectCard to avoid testing it recursively
vi.mock('@/components/ProjectCard', () => ({
    default: () => <div data-testid="project-card">Card</div>,
}))

describe('Home Page', () => {
    it('does not display the Hero section', async () => {
        // Await the server component
        const jsx = await Home()
        render(jsx)

        // This assertion should FAIL initially because the text IS present
        expect(screen.queryByText(/Building the Future/i)).not.toBeInTheDocument()
    })

    it('does not display the Featured Projects header', async () => {
        const jsx = await Home()
        render(jsx)
        // This assertion should FAIL initially
        expect(screen.queryByText(/Featured Projects/i)).not.toBeInTheDocument()
    })
})
