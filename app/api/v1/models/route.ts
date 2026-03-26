import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const models = await db.model.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    return NextResponse.json({
      object: 'list',
      data: models.map((model) => ({
        id: model.name,
        object: 'model',
        created: Math.floor(model.createdAt.getTime() / 1000),
        owned_by: model.provider,
        vetra: {
          provider: model.provider,
          description: model.description,
          context_window: model.contextWindow,
          cost_per_1k: model.costPer1k,
        },
      })),
    });
  } catch {
    return NextResponse.json({
      object: 'list',
      data: [
        {
          id: 'local-echo',
          object: 'model',
          created: Math.floor(Date.now() / 1000),
          owned_by: 'local',
          vetra: { provider: 'local', description: 'Local echo model', context_window: 4096, cost_per_1k: 0 },
        },
        {
          id: 'gpt-4o-mini',
          object: 'model',
          created: Math.floor(Date.now() / 1000),
          owned_by: 'openai',
          vetra: { provider: 'openai', description: 'OpenAI model', context_window: 128000, cost_per_1k: 0 },
        },
      ],
    });
  }
}
