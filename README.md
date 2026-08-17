# 📚 StoryBook

**A premium social reading space for discovering books, building a personal shelf and sharing the ideas that stay with you.**

<div>

![Next.js](https://img.shields.io/badge/NEXT.JS-REACT-111827?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-STRICT-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/SUPABASE-AUTH%20%2B%20POSTGRES-3ecf8e?style=for-the-badge&logo=supabase&logoColor=111827)
![RLS](https://img.shields.io/badge/DATA-ROW%20LEVEL%20SECURITY-00ff88?style=for-the-badge&labelColor=0b1020)

</div>

## ✨ What makes StoryBook different?

StoryBook is designed as an **editorial social-reading product**, not a traditional library CRUD dashboard. The experience combines books, personal progress and community interaction in one mobile-first interface.

### Live product features

- 🎨 Four switchable themes: Paper, Midnight, Rose and Forest
- 🔐 Account creation and sign-in
- 👤 Reader profiles
- 📚 Personal shelves and synced reading progress
- 📖 Book pages with save/review actions
- 💬 Community reviews, likes and comments
- 🔔 Notification center
- 🏆 Reading challenges
- 📱 Mobile-first editorial UX
- ✨ Framer Motion interactions

## 🧰 Stack

| Layer | Technology |
|---|---|
| Framework | Next.js + React |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Supabase Auth |
| Database | PostgreSQL via Supabase |
| Authorization | Supabase Row Level Security |
| Motion | Framer Motion |
| Icons | Lucide |

## 🏗️ Architecture

```text
Next.js application
        │
        ├── Server/client UI
        │
        └── Supabase
              ├── Auth
              ├── PostgreSQL
              └── Row Level Security
```

The public client uses only the publishable Supabase key. Sensitive service-role credentials must remain server-side and must never be committed to the repository.

## 🚀 Setup

### Requirements

- Node.js 18+
- npm
- A Supabase project

### 1. Install

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to populate the catalog.
4. Copy `.env.example` to `.env.local`.
5. Add the public Supabase URL and publishable key.
6. Configure the Supabase Auth redirect URL for your local and deployed origins.

### 3. Start development

```bash
npm run dev
```

### 4. Validate production build

```bash
npm run lint
npm run build
```

## 🔐 Security checklist

Before a public production launch:

- Verify every user-owned table has appropriate RLS policies.
- Test policies for both authorized and unauthorized users.
- Never expose the Supabase service-role key to the browser.
- Validate profile, review and comment input.
- Add moderation/rate limits to community interactions.
- Review authentication redirect URLs.
- Keep `.env.local` out of Git.
- Test data deletion and account-recovery flows.

## 🗺️ Roadmap

- [ ] Advanced book search and filtering
- [ ] Author profiles
- [ ] Better reading analytics
- [ ] Personalized recommendations
- [ ] Moderation tools for community content
- [ ] Reading streaks and richer challenges
- [ ] Automated tests for critical auth/data flows
- [ ] CI build/lint checks on pull requests

## 🤝 Contributing

1. Fork the repository.
2. Create a focused branch.
3. Make the change and keep the UI consistent with the editorial design system.
4. Run lint and build checks.
5. Document schema/environment changes.
6. Open a pull request with validation notes.

## 🎨 Design direction

StoryBook intentionally feels more like a **digital reading culture product** than a traditional library dashboard: expressive typography, tactile book covers, generous whitespace, soft surfaces, responsive navigation and subtle motion.

## 👨‍💻 Author

**Vince Odhiambo**

---

<p align="center"><sub>Read deeply. Share thoughtfully. Keep the ideas that stay with you.</sub></p>
