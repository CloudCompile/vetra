import { describe, expect, it } from 'vitest';
import { generateApiKey } from '@/lib/auth';

describe('auth helpers', () => {
  it('generates vetra API key format', () => {
    const key = generateApiKey();
    expect(key.startsWith('vk_')).toBe(true);
    expect(key.length).toBeGreaterThan(20);
  });
});
