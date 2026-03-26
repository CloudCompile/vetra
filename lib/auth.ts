import { auth as clerkAuth } from '@clerk/nextjs/server';
import { randomBytes } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

const encoder = new TextEncoder();

function getAdminTokenSecret(): string {
  const secret = process.env.ADMIN_SERVICE_TOKEN;
  if (secret) return secret;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_SERVICE_TOKEN must be set in production');
  }

  return 'vetra_admin_secret_token_local';
}

export async function getCurrentUser() {
  const { userId } = await clerkAuth();
  if (!userId) return null;
  return db.user.findUnique({ where: { clerkId: userId } });
}

export async function isAdmin() {
  const { sessionClaims } = await clerkAuth();
  const metadata = (sessionClaims as { metadata?: { role?: string } } | null)?.metadata;
  return metadata?.role === 'admin';
}

export async function getUserPlan() {
  const user = await getCurrentUser();
  if (!user?.planId) return null;
  return db.plan.findUnique({ where: { id: user.planId } });
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
