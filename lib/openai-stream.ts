type StreamChunk = {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: Record<string, string>;
    finish_reason: string | null;
  }>;
};

function createCompletionId(): string {
  if (globalThis.crypto?.randomUUID) {
    return `chatcmpl_${globalThis.crypto.randomUUID()}`;
  }
  return `chatcmpl_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export function createOpenAIStream({
  model,
  tokenStream,
  onComplete,
  onError,
}: {
  model: string;
  tokenStream: AsyncGenerator<string, void, unknown>;
  onComplete: (completionText: string) => Promise<void>;
  onError?: (error: unknown) => Promise<void>;
}): Response {
  const id = createCompletionId();
  const created = Math.floor(Date.now() / 1000);
  const encoder = new TextEncoder();
  const chunks: string[] = [];

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const intro: StreamChunk = {
          id,
          object: 'chat.completion.chunk',
          created,
          model,
          choices: [{ index: 0, delta: { role: 'assistant' }, finish_reason: null }],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(intro)}\n\n`));

        for await (const token of tokenStream) {
          chunks.push(token);
          const payload: StreamChunk = {
            id,
            object: 'chat.completion.chunk',
            created,
            model,
            choices: [{ index: 0, delta: { content: token }, finish_reason: null }],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        }

        const finish: StreamChunk = {
          id,
          object: 'chat.completion.chunk',
          created,
          model,
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(finish)}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
        await onComplete(chunks.join(''));
      } catch (error) {
        if (onError) await onError(error);
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
}
