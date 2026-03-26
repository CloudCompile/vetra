import { db } from '@/lib/db';

export const DEFAULT_PLAN_SLUG = 'free';

export const DEFAULT_PLAN = {
  name: 'Free',
  slug: DEFAULT_PLAN_SLUG,
  description: 'Starter access for testing the Vetra API.',
  monthlyQuota: 1000,
  rateLimit: 10,
  maxTokens: 2000,
  allowedModels: [],
  features: ['Community support', 'Shared capacity'],
  priceInCents: 0,
  isActive: true,
};

export async function ensureDefaultPlan() {
  const existing = await db.plan.findUnique({ where: { slug: DEFAULT_PLAN_SLUG } });
  if (existing) return existing;
  return db.plan.create({ data: DEFAULT_PLAN });
}

export async function ensurePlanForUser(userId: string, planId?: string | null) {
  if (planId) {
    const plan = await db.plan.findUnique({ where: { id: planId } });
    if (plan) return plan;
  }

  const fallback = await ensureDefaultPlan();
  await db.user.update({ where: { id: userId }, data: { planId: fallback.id } });
  return fallback;
}
