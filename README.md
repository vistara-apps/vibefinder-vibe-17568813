# VibeFinder

![VibeFinder Logo](public/logo.png)

**Stop doomscrolling, start discovering: Your AI guide to trending local spots.**

VibeFinder is a web application that curates and displays trending local experiences and events based on real-time social media video analysis, presented visually on a map.

## Features

### AI-Powered Social Curation
Scans Instagram and TikTok videos in real-time to identify trending venues, events, and experiences. Extracts key information like atmosphere, crowd, and activity type.

### Interactive Map View
Displays curated recommendations on an interactive map, allowing users to easily visualize what's happening around them.

### Real-time Trend Insights
Shows *why* a place is trending by integrating short video clips, user sentiment, and key activity highlights directly into recommendations.

### Personalized 'Vibe' Matching
Learns user preferences for atmosphere, crowd, and activity from their social media behavior to tailor recommendations.

## Tech Stack

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

## Documentation

- [API Documentation](docs/api.md)
- [Data Models](docs/data-models.md)
- [Integration Guide](docs/integration-guide.md)
- [Developer Guide](docs/developer-guide.md)

## Business Model

VibeFinder uses a freemium subscription model:

- **Free Tier**: Basic access to trending local spots
- **Premium Tier ($5/month)**: Enhanced experience with personalized recommendations, advanced filtering, no ads, and unlimited saved places

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [EnsembleData](https://ensembledata.com) for social media content scraping
- [SocialKit](https://www.socialkit.dev) for video content analysis
- [OpenAI](https://openai.com) for natural language processing
- [Google Maps](https://developers.google.com/maps) for location-based services
- [Supabase](https://supabase.com) for backend services

