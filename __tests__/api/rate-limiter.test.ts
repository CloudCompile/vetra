import { describe, expect, it } from 'vitest';
import { RateLimiter } from '@/lib/rate-limiter';

describe('RateLimiter', () => {
  it('allows up to configured rate and then blocks', () => {
    const limiter = new RateLimiter();
    expect(limiter.canConsume('k1', { requestsPerMinute: 2 })).toBe(true);
    expect(limiter.canConsume('k1', { requestsPerMinute: 2 })).toBe(true);
    expect(limiter.canConsume('k1', { requestsPerMinute: 2 })).toBe(false);
  });
});
