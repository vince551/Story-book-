# StoryBook

A premium social reading space for discovering books, building a personal shelf and sharing the ideas that stay with you.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS v4
- Supabase Auth + PostgreSQL + Row Level Security
- Framer Motion
- Lucide icons
- GitHub Pages static frontend / Vercel-ready deployment

## Live features

- Four switchable visual themes: Paper, Midnight, Rose and Forest
- Account creation and sign in
- Reader profiles
- Synced reading shelves and progress
- Book pages with live save/review actions
- Community reviews, likes and comments
- Notification center
- Reading challenges
- Mobile-first editorial UX

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to add the StoryBook catalog.
4. Copy `.env.example` to `.env.local` for local development.
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
6. Configure your Supabase Auth redirect URL for the deployed site.

The public frontend never needs a service-role key. RLS protects user-owned data.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Design direction

StoryBook intentionally feels more like an editorial culture product than a traditional library dashboard: expressive typography, tactile book covers, generous whitespace, soft surfaces, responsive navigation and subtle motion.
