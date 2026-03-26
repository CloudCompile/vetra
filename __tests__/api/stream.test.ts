import { describe, expect, it } from 'vitest';
import { LocalProvider } from '@/lib/providers/local-provider';

describe('stream provider', () => {
  it('yields stream tokens', async () => {
    const provider = new LocalProvider();
    const iter = provider.stream({
      model: 'local-echo',
      messages: [{ role: 'user', content: 'abc' }],
      temperature: 0.7,
      top_p: 1,
      stream: true,
    });

    const first = await iter.next();
    expect(first.done).toBe(false);
    expect(typeof first.value).toBe('string');
  });
});
