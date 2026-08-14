# StoryBook

A premium reader community for discovering books, sharing reviews, building reading habits and connecting around stories.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- Lucide icons + Sonner notifications
- Supabase Postgres, Auth, RLS and Storage-ready architecture
- Vercel deployment target

Next.js is used as the full-stack React framework and Supabase provides Postgres/Auth/authorization primitives. Supabase RLS is enabled in the supplied schema so browser data access can remain protected.

## Local setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Create a Supabase project.
4. In Supabase SQL Editor, run `supabase/schema.sql`.
5. Add your project URL and publishable key to `.env.local`.
6. Run `npm install`.
7. Run `npm run dev`.
8. Open `http://localhost:3000`.

## Supabase environment

`NEXT_PUBLIC_SUPABASE_URL`
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never put a Supabase secret/service-role key in browser code. The supplied schema uses Row Level Security for authorization.

## Product modules

- Discover: search, genre filters, ratings and book cards
- Community: reviews, likes, comments-ready feed and discussions
- Library: Want to Read, Reading, Finished and Favorites shelves
- Challenges: reading goals, progress and badges
- Profiles: public identity, bio, avatar and activity
- Notifications: social activity and moderation events
- Moderation: reports with review workflow
- Production: responsive UI, accessibility-minded controls and Vercel-ready Next.js build

## Architecture

`app/` contains the App Router UI.
`lib/supabase/` contains Supabase client utilities.
`supabase/schema.sql` contains the database, relationships, indexes, triggers, seed data and RLS policies.

## Deployment

Import the repository into Vercel, set the two `NEXT_PUBLIC_SUPABASE_*` environment variables, deploy, then set the production site URL in Supabase Auth settings. For email confirmation, configure the Supabase confirmation URL to point at your deployed app.

## Roadmap after v2

- Server-side Supabase auth refresh/proxy for protected server-rendered routes
- Dedicated book detail and author pages
- Realtime comments/notifications
- Image uploads with Supabase Storage
- Moderation dashboard
- Recommendation engine and semantic search
- PWA/offline reading lists
- Analytics and error monitoring
