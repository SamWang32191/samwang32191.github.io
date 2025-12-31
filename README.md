# Sam Wang's Portfolio

A premium portfolio website built with Next.js 15 that automatically showcases GitHub Pages projects.

## Features

- 🚀 **Auto-fetch GitHub Projects** - Automatically fetches and displays your GitHub Pages repositories
- 🎨 **Premium UI Design** - Glassmorphism, smooth animations, and responsive layouts
- ⭐ **Rich Project Cards** - Display topics, star counts, and last updated dates
- 🔧 **Fallback Support** - Gracefully falls back to mock data when API is unavailable
- 📱 **Mobile First** - Fully responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Environment Setup

To enable fetching real data from GitHub, you need to set up a Personal Access Token:

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` (for public repos only) or `repo` (for all repos)
4. Copy the token and add it to your `.env.local` file:

```env
GITHUB_TOKEN=your_personal_access_token_here
```

**Note:** Without a token, the site will display demonstration projects using mock data.

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── data/            # Static data (mock projects)
├── lib/             # Utility functions (GitHub API client)
├── services/        # Business logic (project service)
├── test/            # Test files
└── types/           # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest + Testing Library
- **API:** GitHub REST API via Octokit

## How It Works

1. The site fetches repositories from GitHub API at build time (SSG)
2. Filters for repositories with GitHub Pages enabled (`has_pages: true`)
3. Excludes repositories with `hidden-from-hub` topic
4. Sorts projects alphabetically
5. Displays rich project cards with topics, stars, and last updated info

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Environment Variables for CI/CD

In your GitHub repository settings, add the following secret:

- `GITHUB_TOKEN` - Your Personal Access Token (or use the default GitHub Actions token)

## Contributing

Feel free to open issues or submit pull requests!

## License

MIT
