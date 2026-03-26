import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OpenAIProvider } from '@/lib/providers/openai-provider';

const fetchMock = vi.fn();

describe('OpenAIProvider', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    process.env.OPENAI_API_KEY = 'test-key';
    fetchMock.mockReset();
  });

  it('maps OpenAI response shape', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'chatcmpl_1',
        created: 1,
        model: 'gpt-4o-mini',
        choices: [{ index: 0, finish_reason: 'stop', message: { content: 'ok' } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });

    const provider = new OpenAIProvider();
    const out = await provider.generate({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'hi' }],
      temperature: 0.7,
      top_p: 1,
      stream: false,
    });

    expect(out.id).toBe('chatcmpl_1');
    expect(out.choices[0]?.message?.content).toBe('ok');
  });
});
