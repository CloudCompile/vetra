import { Counter, Histogram, Registry, collectDefaultMetrics } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

const requestsCounter = new Counter({
  name: 'vetra_requests_total',
  help: 'Total number of chat requests',
  labelNames: ['model', 'status'],
  registers: [register],
});

const durationHistogram = new Histogram({
  name: 'vetra_request_duration_ms',
  help: 'Request duration in milliseconds',
  labelNames: ['model', 'status'],
  buckets: [10, 25, 50, 100, 250, 500, 1000, 2000, 5000],
  registers: [register],
});

export function recordUsage(model: string, status: 'success' | 'error', durationMs: number) {
  requestsCounter.inc({ model, status });
  durationHistogram.observe({ model, status }, durationMs);
}

export async function getMetrics() {
  return register.metrics();
}
