import { describe, expect, it } from 'vitest';
import { LocalProvider } from '@/lib/providers/local-provider';

describe('LocalProvider', () => {
  it('generates local completion response', async () => {
    const provider = new LocalProvider();
    const response = await provider.generate({
      model: 'local-echo',
      messages: [{ role: 'user', content: 'hello' }],
      temperature: 0.7,
      top_p: 1,
      stream: false,
    });

    expect(response.object).toBe('text_completion');
    expect(response.choices[0]?.text).toContain('hello');
  });
});
