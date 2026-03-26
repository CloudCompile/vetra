import { NextResponse } from 'next/server';
import { ensureUser } from '@/lib/auth';
import { ensurePlanForUser } from '@/lib/plans';
import { getUserRequestCountThisMonth } from '@/lib/usage';

export async function GET() {
  const user = await ensureUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const plan = await ensurePlanForUser(user.id, user.planId);
  const usageCount = await getUserRequestCountThisMonth(user.id);

  return NextResponse.json({
    data: {
      user,
      plan,
      usageThisMonth: usageCount,
    },
  });
}
