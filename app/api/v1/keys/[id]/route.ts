import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureUser, isAdmin } from '@/lib/auth';

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const admin = await isAdmin();

  const key = await db.apiKey.findUnique({ where: { id } });
  if (!key) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!admin) {
    const user = await ensureUser();
    if (!user || key.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  await db.apiKey.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ ok: true });
}
