# Vercel + Clerk Setup Guide

This guide walks you through deploying Vetra on Vercel with Clerk authentication.

## 1) Prerequisites

- A Vercel account
- A Clerk account
- A Postgres database for production (Neon, Supabase, RDS, etc.)
- Your Vetra repo connected to Vercel

## 2) Create Clerk application

1. In Clerk, create a new application.
2. Copy these keys from Clerk dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Set your Clerk allowed URLs:
   - Development: `http://localhost:3000`
   - Production: `https://<your-vercel-domain>`
4. Configure session/user metadata so admin role can be stored in `metadata.role`.

## 3) Configure Vercel project

1. Import the GitHub repository in Vercel.
2. Framework preset: **Next.js**.
3. Keep default build command (`next build`) and output settings.
4. Ensure the root directory points to repository root.

## 4) Add environment variables in Vercel

Set these in **Project → Settings → Environment Variables** for Production (and Preview if needed):

### Required app/auth
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET` (if using Clerk webhooks)
- `NEXT_PUBLIC_APP_URL` = your public Vercel URL
- `ADMIN_SERVICE_TOKEN` = strong random secret

### Database
- `DATABASE_URL` = Postgres connection string

### Model providers
- `OPENAI_API_KEY`
- `OPENAI_API_BASE` (optional, defaults to OpenAI v1 URL)

### Optional rate-limit backend
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Logging
- `LOG_LEVEL` (e.g. `info` in production)

## 5) Prisma in production

- This project uses Prisma with Postgres in production.
- Generate client during build as needed: `npm run prisma:generate`.
- Run migrations against production DB before/after first deploy using your CI/CD or a secure ops workflow.

Recommended flow:
1. Create migration locally.
2. Commit migration files.
3. Apply migration in production environment.

## 6) Clerk role setup for admin dashboard

The admin check reads `sessionClaims.metadata.role` and expects `admin`.

To grant admin access:
1. Open the user in Clerk dashboard.
2. Add metadata role:
   - `role: "admin"`
3. Re-authenticate the user.
4. Access `/dashboard/admin` and `/api/admin`.

## 7) Deploy

1. Push to your deployment branch.
2. Trigger Vercel deployment.
3. Verify these routes after deploy:
   - `/api/health`
   - `/api/ready`
   - `/api/v1/models`
   - `/dashboard`

## 8) Post-deploy checklist

- [ ] Clerk sign-in works on production domain
- [ ] Admin user can access `/dashboard/admin`
- [ ] Non-admin user is denied admin routes
- [ ] Database connectivity passes readiness (`/api/ready`)
- [ ] Chat endpoints respond (`/api/v1/chat/completions`)
- [ ] Streaming endpoint works (`/api/v1/chat/completions/stream`)

## 9) Local parity tips

For local development, use `.env.local` with local values and run:

```bash
npm install
npm run prisma:generate
npm run dev
```

Then test auth + API behavior locally before promoting to production.
