import { auth as clerkAuth, currentUser } from '@clerk/nextjs/server';
import { randomBytes } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
import { ensurePlanForUser } from './plans';

const encoder = new TextEncoder();

function getAdminTokenSecret(): string {
  const secret = process.env.ADMIN_SERVICE_TOKEN;
  if (secret) return secret;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_SERVICE_TOKEN must be set in production');
  }

  return 'vetra_admin_secret_token_local';
}

export async function ensureUser() {
  const { userId } = await clerkAuth();
  if (!userId) return null;

  const existing = await db.user.findUnique({ where: { clerkId: userId } });
  const clerkProfile = await currentUser();
  const email =
    clerkProfile?.emailAddresses?.[0]?.emailAddress ??
    existing?.email ??
    `${userId}@users.vetra.local`;
  const name =
    [clerkProfile?.firstName, clerkProfile?.lastName].filter(Boolean).join(' ') ||
    clerkProfile?.username ||
    existing?.name ||
    null;

  if (!existing) {
    const created = await db.user.create({
      data: {
        clerkId: userId,
        email,
        name,
      },
    });
    await ensurePlanForUser(created.id, created.planId);
    return created;
  }

  const updated =
    existing.email !== email || existing.name !== name
      ? await db.user.update({
          where: { id: existing.id },
          data: { email, name },
        })
      : existing;

  await ensurePlanForUser(updated.id, updated.planId);
  return updated;
}

export async function getCurrentUser() {
  return ensureUser();
}

export async function isAdmin() {
  const { sessionClaims } = await clerkAuth();
  const metadata = (sessionClaims as { metadata?: { role?: string } } | null)?.metadata;
  return metadata?.role === 'admin';
}

export async function getUserPlan() {
  const user = await ensureUser();
  if (!user) return null;
  return ensurePlanForUser(user.id, user.planId);
}

export function generateApiKey(): string {
  return `vk_${randomBytes(24).toString('base64url')}`;
}

export async function signInternalToken(payload: Record<string, unknown>, expiresIn = '1h') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encoder.encode(getAdminTokenSecret()));
}

export async function verifyInternalToken(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(getAdminTokenSecret()));
  return payload;
}
