import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RootLayout from './layout'

// Mock next/font/google
vi.mock('next/font/google', () => ({
    Geist: () => ({ variable: 'font-geist-sans' }),
    Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}))

describe('RootLayout', () => {
    it('does not display navigation links', () => {
        render(
            <RootLayout>
                <div data-testid="child">Child Content</div>
            </RootLayout>
        )

        // These assertions should FAIL initially because the links ARE present
        expect(screen.queryByText(/Projects/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/About/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Contact/i)).not.toBeInTheDocument()
    })

    it('renders the brand title', () => {
        render(
            <RootLayout>
                <div>Child</div>
            </RootLayout>
        )
        expect(screen.getByText('SamWang Portfolio')).toBeInTheDocument()
    })
})
