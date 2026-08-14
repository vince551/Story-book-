# StoryBook

A premium reader community for discovering books, sharing reviews, building reading habits and connecting around stories.

## Stack

- Next.js 16 App Router + React + TypeScript
- Tailwind CSS v4
- Lucide icons + Sonner notifications
- Supabase Postgres, Auth, RLS, SSR sessions and Storage-ready architecture
- Vercel deployment target

Next.js provides the full-stack React application layer. Supabase provides Postgres, Auth and row-level authorization. The app uses the modern `@supabase/ssr` package for browser/server clients and a Next.js `proxy.ts` session refresh path.

## Local setup

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local`.
3. Create a Supabase project.
4. In Supabase SQL Editor, run `supabase/schema.sql`.
5. Run `supabase/migrations/001_hardening.sql`.
6. Add your project URL and publishable key to `.env.local`.
7. Run `npm install`.
8. Run `npm run dev`.
9. Open `http://localhost:3000`.

## Supabase environment

`NEXT_PUBLIC_SUPABASE_URL`
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never put a Supabase secret/service-role key in browser code. The supplied schema enables Row Level Security and limits mutations to the authenticated owner where appropriate.

## Product modules

- Discover: instant search, genre filters, ratings and curated book cards
- Community: reviews, likes, comment-ready discussions and social activity
- Library: Want to Read, Reading, Finished and Favorites shelves
- Challenges: reading goals, progress and badges
- Profiles: public identity, bio, avatar and activity model
- Notifications: social activity and moderation model
- Moderation: report workflow and roles in the database model
- UX: responsive mobile navigation, skeleton loading, error recovery and premium dark/glass UI
- Production: TypeScript, environment hygiene, RLS, SSR auth refresh and CI build checks

## Architecture

`app/` contains the App Router UI.
`lib/supabase/client.ts` is the browser client.
`lib/supabase/server.ts` is the cookie-aware server client.
`lib/supabase/proxy.ts` and `proxy.ts` refresh Supabase sessions safely.
`supabase/schema.sql` contains the database, relationships, indexes, triggers, seed data and RLS policies.
`supabase/migrations/001_hardening.sql` adds ownership defaults and uniqueness hardening.

## Deployment

Import the repository into Vercel, set the two `NEXT_PUBLIC_SUPABASE_*` environment variables for Production/Preview as needed, and deploy. Vercel has first-class Next.js support. After deployment, set the production Site URL and allowed redirect URLs in Supabase Auth settings. Environment-variable changes require a redeploy.

## Next product layer

- Dedicated `/books/[id]` and `/u/[username]` routes
- Realtime community notifications using Supabase Broadcast
- Supabase Storage for avatars and book covers
- Admin/moderation dashboard
- Open-library/Google Books style metadata ingestion
- Recommendation engine and semantic search with pgvector
- PWA/offline reading lists
- Analytics, observability and automated accessibility/e2e tests
