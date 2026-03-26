export interface RateLimitConfig {
  requestsPerMinute: number;
}

class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(capacity: number) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(capacity: number): void {
    const now = Date.now();
    const timePassedMinutes = (now - this.lastRefill) / 1000 / 60;
    this.tokens = Math.min(capacity, this.tokens + timePassedMinutes * capacity);
    this.lastRefill = now;
  }

  canConsume(capacity: number, amount = 1): boolean {
    this.refill(capacity);
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
      this.buckets.set(key, new TokenBucket(config.requestsPerMinute));
    }

    return this.buckets.get(key)!.canConsume(config.requestsPerMinute);
  }
}

export const globalRateLimiter = new RateLimiter();
