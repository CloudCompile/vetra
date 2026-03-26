# Vetra

Vetra is a production-focused AI inference API with an admin dashboard, built with Next.js App Router, TypeScript, Prisma, and Clerk.

## Quick Start

```bash
npm install
npm run prisma:generate
npm run dev
```

Open `http://localhost:3000`.

## Core API

- `POST /api/v1/chat/completions`
- `POST /api/v1/chat/completions/stream`
- `GET /api/v1/models`
- `GET|POST|DELETE /api/v1/keys`
- `GET|POST /api/v1/plans`
- `GET /api/health`
- `GET /api/ready`

## Admin Dashboard

- `/dashboard/admin`
- `/dashboard/admin/keys`
- `/dashboard/admin/plans`
- `/dashboard/admin/usage`


## Deployment Guide

- Vercel + Clerk setup: `docs/VERCEL_CLERK_SETUP.md`
