# StoryBook

StoryBook is a lightweight, premium reading platform for discovering books, saving a personal shelf, exploring reviews and building reading habits.

## Rebuilt architecture

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- Lucide icons
- Browser localStorage for device-local library and community submissions
- Vercel-ready

There is deliberately **no database, authentication service, API key or server backend** in this version. The goal is a fast, elegant product that is easy to develop and deploy from any device.

## Routes

- `/` — editorial landing page
- `/discover` — searchable book collection and genre filters
- `/books/[id]` — dedicated book profiles
- `/community` — reader reviews and reactions
- `/library` — saved personal shelf
- `/challenges` — reading goals and progress
- `/share` — review composer

## UX direction

The redesign treats StoryBook as an editorial culture product rather than a traditional library dashboard: oversized typography, tactile book-cover compositions, warm paper tones, dark ink surfaces, generous whitespace, responsive navigation and focused calls to action.

## Local data

Saved books and submitted reviews use browser `localStorage`. Clearing site data clears the local shelf and submissions. This makes the MVP private, simple and zero-cost to operate.

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run typecheck
npm run build
```

## Deployment

Import the repository into Vercel and deploy. No environment variables are required.

## Future scaling

If StoryBook eventually needs synchronized accounts, cloud libraries, real comments or realtime activity, a backend can be added behind the current UI without changing the product's core visual architecture.
