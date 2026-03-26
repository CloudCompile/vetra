import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const models = await db.model.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
    return NextResponse.json({ data: models });
  } catch {
    return NextResponse.json({
      data: [
        { name: 'local-echo', provider: 'local', description: 'Local echo model', isActive: true },
        { name: 'gpt-4o-mini', provider: 'openai', description: 'OpenAI model', isActive: true },
      ],
    });
  }
}
