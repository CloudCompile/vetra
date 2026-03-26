import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateApiKey, isAdmin } from '@/lib/auth';
import { CreateApiKeySchema } from '@/lib/schemas/api-key';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const keys = await db.apiKey.findMany({ include: { plan: true, user: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data: keys });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const parsed = CreateApiKeySchema.parse(await request.json());
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

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing key id' }, { status: 400 });

  await db.apiKey.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ ok: true });
}
