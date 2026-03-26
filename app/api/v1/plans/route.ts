import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { PlanSchema } from '@/lib/schemas/api-key';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const plans = await db.plan.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data: plans });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const payload = PlanSchema.parse(await request.json());
  const created = await db.plan.create({ data: payload });
  return NextResponse.json({ data: created }, { status: 201 });
}
