export interface RateLimitConfig {
  requestsPerMinute: number;
  refillRatePerMinute?: number;
}

class TokenBucket {
  private readonly capacity: number;
  private readonly refillRatePerMinute: number;
  private tokens: number;
  private lastRefill: number;

  constructor(capacity: number, refillRatePerMinute: number) {
    this.capacity = capacity;
    this.refillRatePerMinute = refillRatePerMinute;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const timePassedMinutes = (now - this.lastRefill) / 1000 / 60;
    const refillTokens = timePassedMinutes * this.refillRatePerMinute;
    this.tokens = Math.min(this.capacity, this.tokens + refillTokens);
    this.lastRefill = now;
  }

  canConsume(amount = 1): boolean {
    this.refill();
    if (this.tokens >= amount) {
      this.tokens -= amount;
      return true;
    }
    return false;
  }
}

export class RateLimiter {
  private buckets = new Map<string, TokenBucket>();

  canConsume(key: string, config: RateLimitConfig): boolean {
    if (!this.buckets.has(key)) {
      this.buckets.set(
        key,
        new TokenBucket(config.requestsPerMinute, config.refillRatePerMinute ?? config.requestsPerMinute),
      );
    }

    return this.buckets.get(key)!.canConsume();
  }
}

export const globalRateLimiter = new RateLimiter();
