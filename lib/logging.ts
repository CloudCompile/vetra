import pino from 'pino';

export const logger = pino({
  name: 'vetra',
  level: process.env.LOG_LEVEL ?? 'info',
  redact: ['req.headers.authorization'],
});
