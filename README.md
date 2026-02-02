# ZERO

**Z**ombie **E**mergency **R**esponse **O**rganization — Be prepared for anything.

A Next.js 16 web app with Tailwind CSS and Prisma, rebuilt from the legacy Angular version.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS 4**
- **Prisma 7** (PostgreSQL)
- **React 19**
- **NextAuth** (Auth.js) — SSO (Keycloak, Google, Facebook), role-based access
- **Zustand** — Cart state with persistence
- **Stripe** — Checkout (card, Apple Pay, Google Pay)

## Prerequisites

- Node.js 18+
- PostgreSQL (or Docker)

## Setup

1. Clone and install:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and adjust if needed:

   ```bash
   cp .env.example .env
   ```

3. Start Postgres (e.g. with Docker):

   ```bash
   docker compose up -d
   ```

4. Run migrations and seed:

   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

5. (Optional) Auth and payments: set env vars from `.env.example` (NextAuth, Keycloak/Google/Facebook, Stripe). Without them, sign-in and checkout will show errors when used.

## Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Build

```bash
npm run build
npm run start
```

## Scripts

| Script        | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start dev server (port 3001)   |
| `npm run build` | Production build             |
| `npm run start` | Start production server      |
| `npm run db:seed` | Seed the database          |
| `npm run lint` | Run ESLint                    |

## Routes

- `/` — Home
- `/about` — About
- `/join` — Join ZERO
- `/shopping` — Merchandise (products, add to cart)
- `/shopping/[slug]` — Product detail
- `/news` — News
- `/outbreak` — Outbreak blog (list)
- `/outbreak/[slug]` — Blog post detail
- `/cart` — Cart (Zustand, persist)
- `/cart/checkout` — Checkout (Stripe)
- `/cart/checkout/success` — Payment success
- `/cart/checkout/cancel` — Checkout cancelled
- `/auth/signin` — Sign in (Google, Facebook, Keycloak)
- `/admin` — Admin dashboard (AUTHOR/ADMIN)
- `/admin/posts` — Blog posts CRUD
- `/admin/channels` — Channel and author management
- `/test` — Test page
