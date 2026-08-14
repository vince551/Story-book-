# StoryBook

A premium, lightweight reading discovery app for finding books, saving favorites and sharing thoughtful reviews.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- Lucide icons
- Sonner notifications
- Browser `localStorage` for personal saves and reviews
- Vercel-ready deployment

## Why this architecture?

StoryBook intentionally has **no complicated backend**. The current product is a polished client-side MVP: users can search and filter books, save books, like reviews and publish reviews without accounts, databases or API keys.

Personal data is stored locally on the device. This keeps the project simple, cheap to host and easy to develop on a phone.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Product

- Editorial landing page
- Curated book discovery
- Instant search
- Genre filters
- Book detail modal
- Personal save/library interactions
- Community review feed
- Like interactions
- Review composer
- Reading streak/challenge section
- Responsive mobile navigation
- Premium editorial visual system
- No account required
- No environment variables required

## Design direction

StoryBook uses a warm editorial palette, oversized typography, book-inspired compositions, subtle glass effects, generous whitespace, tactile rounded surfaces and restrained motion. The goal is to feel closer to a premium culture/editorial product than a generic library dashboard.

## Deployment

The app can be deployed directly to Vercel or any platform that supports Next.js. No database configuration or secret environment variables are required.

## Future, only if needed

If StoryBook grows into a multi-user social network, a backend can be added later for authentication, cloud profiles, synchronized libraries, comments and realtime notifications. The UI is intentionally designed so that this can happen without rebuilding the product from scratch.
