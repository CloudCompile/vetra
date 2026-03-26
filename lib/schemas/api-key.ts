import { z } from 'zod';

export const CreateApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  planId: z.string().min(1).optional(),
  userId: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const UpdateApiKeySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export const PlanSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  monthlyQuota: z.number().int().positive().default(1000),
  rateLimit: z.number().int().positive().default(10),
  maxTokens: z.number().int().positive().default(2000),
  allowedModels: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  priceInCents: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});
