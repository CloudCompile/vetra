import { NextRequest, NextResponse } from 'next/server';
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';
import { providerNameFromModel } from '@/lib/providers/model-router';
import { globalRegistry } from '@/lib/providers/registry';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const parsed = ChatCompletionRequestSchema.parse(await request.json());
    const provider = globalRegistry.get(providerNameFromModel(parsed.model));

    if (!provider) {
      return NextResponse.json({ error: 'No provider available for model' }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const token of provider.stream(parsed)) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
