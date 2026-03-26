# Vetra Architecture

Vetra is a Next.js App Router application exposing inference APIs and an admin dashboard.

## Layers
- API routes under `app/api`
- Provider abstraction under `lib/providers`
- Persistence via Prisma in `lib/db.ts`
- Auth and role checks via Clerk helpers in `lib/auth.ts`
- Admin UI under `app/dashboard/admin`

## Data Flow
1. Request enters API route.
2. Auth and rate-limit checks are applied.
3. Provider generates completion/stream tokens.
4. Usage metrics and usage logs are persisted.
