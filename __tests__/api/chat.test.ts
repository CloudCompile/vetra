import { describe, expect, it } from 'vitest';
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';

describe('chat schema', () => {
  it('validates chat completion payload', () => {
    const parsed = ChatCompletionRequestSchema.parse({
      model: 'local-echo',
      messages: [{ role: 'user', content: 'hello' }],
      temperature: 0.7,
      top_p: 1,
      stream: false,
    });

    expect(parsed.model).toBe('local-echo');
  });
});
