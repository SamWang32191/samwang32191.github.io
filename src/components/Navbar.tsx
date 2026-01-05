import { siteConfig } from '@/config/site'

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full glass border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a
                    href={siteConfig.repoUrl}
                    className="text-xl font-bold text-gradient cursor-pointer hover:opacity-80 transition-opacity"
                >
                    SamWang Portfolio
                </a>
            </div>
        </header>
    )
}
