# VibeFinder Developer Guide

This guide provides comprehensive information for developers working on the VibeFinder application, including project structure, coding standards, and development workflows.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Performance Optimization](#performance-optimization)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)

## Project Overview

VibeFinder is a web application that curates and displays trending local experiences and events based on real-time social media video analysis, presented visually on a map. The application uses Next.js for the frontend, Supabase for the backend, and integrates with various external APIs for data collection and analysis.

### Core Features

- AI-Powered Social Curation
- Interactive Map View
- Real-time Trend Insights
- Personalized 'Vibe' Matching

### Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **APIs**: EnsembleData, SocialKit, OpenAI, Google Maps
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git
- Supabase CLI (optional, for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/vibefinder-vibe-17568813.git
   cd vibefinder-vibe-17568813
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys and configuration values.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# EnsembleData
ENSEMBLE_DATA_API_KEY=your_ensemble_data_api_key
ENSEMBLE_DATA_API_URL=https://ensembledata.com

# SocialKit
SOCIALKIT_API_KEY=your_socialkit_api_key
SOCIALKIT_API_URL=https://www.socialkit.dev

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Project Structure

The project follows a standard Next.js 14 structure with App Router:

```
vibefinder/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── auth/               # Authentication pages
│   ├── discover/           # Discover page
│   ├── onboarding/         # Onboarding pages
│   ├── profile/            # User profile pages
│   ├── recommendations/    # Recommendation details pages
│   ├── saved/              # Saved recommendations page
│   ├── subscription/       # Subscription management pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── auth/               # Authentication components
│   ├── map/                # Map-related components
│   ├── ui/                 # UI components
│   └── ...
├── docs/                   # Documentation
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and libraries
├── public/                 # Static assets
├── services/               # API service integrations
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── .env.example            # Example environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project README
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

### Key Directories

#### `app/`

Contains the Next.js App Router pages and layouts. Each subdirectory represents a route in the application.

#### `components/`

Contains reusable React components organized by feature or functionality.

- `auth/`: Authentication-related components
- `map/`: Map-related components
- `ui/`: Generic UI components

#### `hooks/`

Contains custom React hooks for shared logic.

#### `lib/`

Contains utility functions and libraries.

#### `services/`

Contains API service integrations for external APIs.

#### `types/`

Contains TypeScript type definitions.

## Development Workflow

### Feature Development

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your feature with appropriate tests.

3. Run tests and ensure they pass:
   ```bash
   npm run test
   ```

4. Format and lint your code:
   ```bash
   npm run format
   npm run lint
   ```

5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```

6. Push your branch and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Bug Fixes

1. Create a new branch from `main`:
   ```bash
   git checkout -b fix/bug-description
   ```

2. Fix the bug and add tests to prevent regression.

3. Run tests and ensure they pass:
   ```bash
   npm run test
   ```

4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "fix: fix bug description"
   ```

5. Push your branch and create a pull request:
   ```bash
   git push origin fix/bug-description
   ```

### Code Review Process

1. All pull requests require at least one review before merging.
2. Reviewers should check for:
   - Code quality and adherence to coding standards
   - Test coverage
   - Performance implications
   - Security considerations
3. Address all review comments before merging.

## Coding Standards

### General Guidelines

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Write self-documenting code with clear variable and function names
- Keep functions small and focused on a single responsibility
- Add comments for complex logic or non-obvious behavior

### TypeScript

- Use explicit types for function parameters and return values
- Avoid using `any` type
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Use type guards for runtime type checking

### React

- Use functional components with hooks
- Use the React Context API for global state management
- Keep components small and focused on a single responsibility
- Use proper component composition to avoid prop drilling
- Use React.memo for performance optimization when appropriate

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the utility-first approach
- Use custom CSS only when necessary
- Use CSS variables for theme colors and spacing

### File Naming Conventions

- Use PascalCase for React components: `AppHeader.tsx`
- Use camelCase for utility functions and hooks: `useMap.ts`
- Use kebab-case for CSS files: `global-styles.css`
- Use lowercase with hyphens for documentation files: `developer-guide.md`

## Testing

### Unit Testing

Use Jest and React Testing Library for unit testing.

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Integration Testing

Use Cypress for integration testing.

```bash
# Open Cypress test runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

### End-to-End Testing

Use Playwright for end-to-end testing.

```bash
# Run Playwright tests
npm run test:e2e

# Run Playwright tests with UI
npm run test:e2e:ui
```

### Test Coverage

Aim for at least 80% test coverage for critical paths.

## Deployment

### Development Environment

The development environment is automatically deployed from the `develop` branch.

### Staging Environment

The staging environment is automatically deployed from the `staging` branch.

### Production Environment

The production environment is deployed from the `main` branch after manual approval.

### Deployment Process

1. Merge your feature branch into `develop` for testing.
2. Once tested, merge `develop` into `staging` for final verification.
3. After verification, create a pull request from `staging` to `main`.
4. After approval, merge to `main` to trigger production deployment.

## Performance Optimization

### Code Splitting

Use Next.js built-in code splitting to reduce initial load time.

```javascript
// Use dynamic imports for large components
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/map/MapView'), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // Disable server-side rendering for components that use browser APIs
});
```

### Image Optimization

Use Next.js Image component for automatic image optimization.

```javascript
import Image from 'next/image';

// Use the Image component for optimal loading
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={isHero} // Load priority for above-the-fold images
  loading="lazy" // Lazy load for below-the-fold images
/>
```

### API Request Optimization

Use SWR for data fetching with built-in caching and revalidation.

```javascript
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}!</div>;
}
```

### Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

```javascript
import { useMemo, useCallback } from 'react';

// Memoize expensive calculations
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// Memoize callback functions
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []);
```

## Troubleshooting

### Common Issues

#### API Key Issues

If you're experiencing API errors, check that your API keys are correctly set in the `.env.local` file and that they have the necessary permissions.

#### Supabase Connection Issues

If you're having trouble connecting to Supabase:

1. Verify your Supabase URL and anon key in `.env.local`
2. Check that your IP is allowed in the Supabase dashboard
3. Ensure your database schema matches the expected structure

#### Google Maps Issues

If the map is not loading:

1. Verify your Google Maps API key in `.env.local`
2. Check that you've enabled the necessary Google Maps APIs in the Google Cloud Console
3. Ensure you're not exceeding your API quota

### Debugging

#### Client-Side Debugging

Use the browser's developer tools for client-side debugging:

1. Open the browser's developer tools (F12 or Ctrl+Shift+I)
2. Navigate to the Console tab to view errors and logs
3. Use the Network tab to inspect API requests and responses
4. Use the React Developer Tools extension for component debugging

#### Server-Side Debugging

For server-side debugging:

1. Add `console.log` statements in your API routes
2. Check the terminal where you're running `npm run dev` for server logs
3. Use the Supabase dashboard to view database logs and queries

## Contributing

### Pull Request Guidelines

1. Create a branch from `main` with a descriptive name
2. Make your changes with appropriate tests
3. Ensure all tests pass
4. Update documentation if necessary
5. Submit a pull request with a clear description of the changes

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(map): add clustering for map markers

- Added marker clustering for better performance with many markers
- Implemented custom cluster icons
- Added zoom-on-click behavior for clusters

Closes #123
```

### Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when contributing to this project.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript/overview)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

