import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from './Navbar'
import { siteConfig } from '@/config/site'

describe('Navbar', () => {
    it('renders the site title "SamWang Portfolio"', () => {
        render(<Navbar />)
        expect(screen.getByText('SamWang Portfolio')).toBeInTheDocument()
    })

    it('renders the logo as a link pointing to siteConfig.repoUrl', () => {
        render(<Navbar />)
        const logoLink = screen.getByRole('link', { name: /samwang portfolio/i })
        expect(logoLink).toHaveAttribute('href', siteConfig.repoUrl)
    })

    it('logo link has cursor-pointer styling', () => {
        render(<Navbar />)
        const logoLink = screen.getByRole('link', { name: /samwang portfolio/i })
        expect(logoLink).toHaveClass('cursor-pointer')
    })
})
