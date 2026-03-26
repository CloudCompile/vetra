import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureUser, generateApiKey, isAdmin } from '@/lib/auth';
import { ensurePlanForUser } from '@/lib/plans';
import { CreateApiKeySchema } from '@/lib/schemas/api-key';

export async function GET() {
  const admin = await isAdmin();
  if (admin) {
    const keys = await db.apiKey.findMany({
      include: { plan: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: keys });
  }

  const user = await ensureUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keys = await db.apiKey.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ data: keys });
}

export async function POST(request: NextRequest) {
  const admin = await isAdmin();
  const parsed = CreateApiKeySchema.parse(await request.json());

  if (admin) {
    if (!parsed.planId) {
      return NextResponse.json({ error: 'planId is required for admin key creation' }, { status: 400 });
    }

    if (parsed.userId) {
      const userExists = await db.user.findUnique({ where: { id: parsed.userId } });
      if (!userExists) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    const created = await db.apiKey.create({
      data: {
        name: parsed.name,
        key: generateApiKey(),
        planId: parsed.planId,
        userId: parsed.userId,
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
      },
      include: { plan: true, user: true },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  }

  const user = await ensureUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const plan = await ensurePlanForUser(user.id, user.planId);
  const created = await db.apiKey.create({
    data: {
      name: parsed.name,
      key: generateApiKey(),
      planId: plan.id,
      userId: user.id,
      expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
    },
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
