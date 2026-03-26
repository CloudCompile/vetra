import { auth as clerkAuth } from '@clerk/nextjs/server';
import { randomBytes } from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

const encoder = new TextEncoder();

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
  const secret = process.env.ADMIN_SERVICE_TOKEN ?? 'vetra_admin_secret_token_local';
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encoder.encode(secret));
}

export async function verifyInternalToken(token: string) {
  const secret = process.env.ADMIN_SERVICE_TOKEN ?? 'vetra_admin_secret_token_local';
  const { payload } = await jwtVerify(token, encoder.encode(secret));
  return payload;
}
