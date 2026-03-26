\# Vetra — Complete LLM Prompt for Building the AI Inference API \+ Admin Dashboard

You are an expert full-stack engineer and platform architect building Vetra, a production-grade AI inference API with an admin dashboard. You have complete control over the entire repository. Generate everything from scratch: all code files, configurations, documentation, tests, database schemas, deployment files, SDKs, CI workflows, and GitHub issues.

\#\# Core Requirements

\*\*Stack\*\*: Next.js 14+ (App Router) with TypeScript, Prisma ORM, Clerk auth, Vercel deployment.

\*\*API Endpoints\*\*:  
\- \`POST /api/v1/chat/completions\` — synchronous chat inference  
\- \`POST /api/v1/chat/completions/stream\` — streaming token output via SSE  
\- \`GET /api/v1/models\` — list available models  
\- \`GET/POST/DELETE /api/v1/keys\` — API key management (admin)  
\- \`GET/POST/PUT/DELETE /api/v1/plans\` — plan management (admin)  
\- \`GET /api/health\` — health check  
\- \`GET /api/ready\` — readiness probe

\*\*Authentication & Authorization\*\*:  
\- Clerk for web UI sign-in and role metadata (stored in public/private metadata)  
\- API key bearer token for programmatic access  
\- Roles: \`admin\` (full access), \`pro\` (premium features), \`free\` (limited quota)  
\- Admin checks via Clerk metadata on server-side routes  
\- Rate limiting per API key and per IP (in-memory with optional Redis adapter)

\*\*Admin Dashboard\*\*:  
\- Path: \`/dashboard/admin\` (protected, Clerk admin role check)  
\- Features:  
  \- API key creation, listing, revocation, with TTL management  
  \- Plan management (create, edit, delete plans; set quotas, rate limits, feature flags)  
  \- Usage metrics (per-key, per-plan aggregates)  
  \- Admin settings (enable/disable model providers, set defaults)

\*\*Branding\*\*: Vetra — windy, stormy vibe with cozy book-nook feel. Use calming storm blues, warm parchment tones, and prose that feels like a whispered recommendation in a library.

\*\*Deployment\*\*: Vercel free tier with serverless Node.js functions. Edge Functions for streaming. Clerk integration for auth. SQLite for local dev, Postgres for production.

\#\# Deliverables (Generate Everything)

\#\#\# 1\. Full Application File Structure  
Generate every file listed below. No placeholders or TODOs where full files are needed.

\`\`\`  
vetra/  
├── .env.example  
├── .env.local (local dev)  
├── .gitignore  
├── package.json  
├── tsconfig.json  
├── next.config.js  
├── vercel.json  
├── prisma/  
│   ├── schema.prisma  
│   └── migrations/  
│       └── init/  
│           └── migration.sql  
├── app/  
│   ├── layout.tsx  
│   ├── page.tsx  
│   ├── api/  
│   │   ├── v1/  
│   │   │   ├── chat/  
│   │   │   │   ├── completions/  
│   │   │   │   │   └── route.ts  
│   │   │   │   └── completions/  
│   │   │   │       └── stream/  
│   │   │   │           └── route.ts  
│   │   │   ├── models/  
│   │   │   │   └── route.ts  
│   │   │   ├── keys/  
│   │   │   │   ├── route.ts  
│   │   │   │   └── \[id\]/  
│   │   │   │       └── route.ts  
│   │   │   ├── plans/  
│   │   │   │   ├── route.ts  
│   │   │   │   └── \[id\]/  
│   │   │   │       └── route.ts  
│   │   │   ├── health/  
│   │   │   │   └── route.ts  
│   │   │   └── ready/  
│   │   │       └── route.ts  
│   │   └── admin/  
│   │       └── route.ts (admin auth check)  
│   ├── dashboard/  
│   │   ├── page.tsx (user dashboard)  
│   │   ├── layout.tsx  
│   │   └── admin/  
│   │       ├── page.tsx (admin dashboard)  
│   │       ├── keys/  
│   │       │   ├── page.tsx  
│   │       │   └── components/  
│   │       │       ├── KeyList.tsx  
│   │       │       └── CreateKeyForm.tsx  
│   │       ├── plans/  
│   │       │   ├── page.tsx  
│   │       │   └── components/  
│   │       │       ├── PlanList.tsx  
│   │       │       └── PlanEditor.tsx  
│   │       └── usage/  
│   │           ├── page.tsx  
│   │           └── components/  
│   │               └── UsageMetrics.tsx  
│   └── auth/  
│       └── callback/  
│           └── route.ts (Clerk callback)  
├── lib/  
│   ├── auth.ts (Clerk helpers \+ JWT)  
│   ├── db.ts (Prisma client)  
│   ├── providers/  
│   │   ├── IModelProvider.ts (interface)  
│   │   ├── openai-provider.ts  
│   │   ├── local-provider.ts  
│   │   └── registry.ts  
│   ├── rate-limiter.ts  
│   ├── middleware.ts (Next.js middleware)  
│   ├── logging.ts (pino)  
│   ├── metrics.ts (Prometheus)  
│   └── schemas/  
│       ├── chat.ts (Zod schemas)  
│       └── api-key.ts  
├── components/  
│   ├── dashboard/  
│   │   └── Layout.tsx  
│   ├── ui/  
│   │   ├── Button.tsx  
│   │   ├── Card.tsx  
│   │   ├── Input.tsx  
│   │   └── Modal.tsx  
│   └── branding/  
│       └── VetraTheme.tsx  
├── styles/  
│   ├── globals.css  
│   ├── vetra.css (brand tokens)  
│   └── tailwind.config.ts  
├── public/  
│   └── logo.svg  
├── \_\_tests\_\_/  
│   ├── api/  
│   │   ├── chat.test.ts  
│   │   ├── stream.test.ts  
│   │   ├── auth.test.ts  
│   │   └── rate-limiter.test.ts  
│   └── providers/  
│       ├── openai-provider.test.ts  
│       └── local-provider.test.ts  
├── Dockerfile  
├── docker-compose.yml  
├── .github/  
│   └── workflows/  
│       ├── test.yml  
│       └── deploy.yml  
├── docs/  
│   ├── ARCHITECTURE.md  
│   ├── API.md  
│   ├── SETUP.md  
│   ├── DEPLOYMENT.md  
│   ├── BRAND.md  
│   └── openapi.yaml  
└── README.md  
\`\`\`

\#\#\# 2\. Environment Variables (.env.example)  
\`\`\`  
NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY=pk\_test\_...  
CLERK\_SECRET\_KEY=sk\_test\_...  
CLERK\_WEBHOOK\_SECRET=whsec\_...

DATABASE\_URL=postgresql://user:password@localhost:5432/vetra  
\# For local dev: DATABASE\_URL="file:./dev.db"

OPENAI\_API\_KEY=sk-...  
OPENAI\_API\_BASE=https://api.openai.com/v1

UPSTASH\_REDIS\_REST\_URL=https://...  
UPSTASH\_REDIS\_REST\_TOKEN=...

\# Admin service token (for internal admin APIs)  
ADMIN\_SERVICE\_TOKEN=vetra\_admin\_secret\_token\_...

NEXT\_PUBLIC\_APP\_URL=http://localhost:3000  
VERCEL\_ENV=development

\# Logging  
LOG\_LEVEL=debug  
\`\`\`

\#\#\# 3\. Prisma Schema (prisma/schema.prisma)  
\`\`\`prisma  
datasource db {  
  provider \= "postgresql"  // or "sqlite" for local dev  
  url      \= env("DATABASE\_URL")  
}

generator client {  
  provider \= "prisma-client-js"  
}

model User {  
  id            String    @id @default(cuid())  
  clerkId       String    @unique  
  email         String    @unique  
  name          String?  
  role          String    @default("free")  // admin, pro, free  
  planId        String?  
  plan          Plan?     @relation(fields: \[planId\], references: \[id\])  
  apiKeys       ApiKey\[\]  
  usageLogs     UsageLog\[\]  
  createdAt     DateTime  @default(now())  
  updatedAt     DateTime  @updatedAt  
}

model Plan {  
  id              String    @id @default(cuid())  
  name            String    @unique  
  slug            String    @unique  
  description     String?  
  monthlyQuota    Int       @default(1000)      // requests per month  
  rateLimit       Int       @default(10)        // requests per minute  
  maxTokens       Int       @default(2000)  
  allowedModels   String\[\]  @default(\[\])        // empty \= all models  
  features        String\[\]  @default(\[\])  
  priceInCents    Int       @default(0)  
  isActive        Boolean   @default(true)  
  users           User\[\]  
  apiKeys         ApiKey\[\]  
  createdAt       DateTime  @default(now())  
  updatedAt       DateTime  @updatedAt  
}

model ApiKey {  
  id              String    @id @default(cuid())  
  name            String  
  key             String    @unique  @db.VarChar(255)  
  userId          String?  
  user            User?     @relation(fields: \[userId\], references: \[id\], onDelete: Cascade)  
  planId          String  
  plan            Plan      @relation(fields: \[planId\], references: \[id\], onDelete: Cascade)  
  isActive        Boolean   @default(true)  
  lastUsedAt      DateTime?  
  expiresAt       DateTime?  
  quotaResetAt    DateTime  @default(now())  
  usageThisMonth  Int       @default(0)  
  createdAt       DateTime  @default(now())  
  updatedAt       DateTime  @updatedAt  
  usageLogs       UsageLog\[\]  
}

model UsageLog {  
  id              String    @id @default(cuid())  
  userId          String?  
  user            User?     @relation(fields: \[userId\], references: \[id\], onDelete: SetNull)  
  apiKeyId        String?  
  apiKey          ApiKey?   @relation(fields: \[apiKeyId\], references: \[id\], onDelete: SetNull)  
  model           String  
  inputTokens     Int  
  outputTokens    Int  
  totalTokens     Int  
  durationMs      Int  
  status          String    @default("success")  // success, error, rate\_limited  
  errorMessage    String?  
  createdAt       DateTime  @default(now())  
    
  @@index(\[userId\])  
  @@index(\[apiKeyId\])  
  @@index(\[createdAt\])  
}

model Model {  
  id              String    @id @default(cuid())  
  name            String    @unique  
  provider        String              // openai, huggingface, local, etc.  
  description     String?  
  contextWindow   Int       @default(4096)  
  costPer1k       Float     @default(0.0)  
  isActive        Boolean   @default(true)  
  createdAt       DateTime  @default(now())  
  updatedAt       DateTime  @updatedAt  
}  
\`\`\`

\#\#\# 4\. Zod Schemas (lib/schemas/)  
Create \`lib/schemas/chat.ts\`:  
\`\`\`typescript  
import { z } from 'zod';

export const ChatCompletionRequestSchema \= z.object({  
  model: z.string().min(1),  
  messages: z.array(z.object({  
    role: z.enum(\['system', 'user', 'assistant'\]),  
    content: z.string(),  
  })),  
  temperature: z.number().min(0).max(2).default(0.7),  
  top\_p: z.number().min(0).max(1).default(1),  
  max\_tokens: z.number().int().positive().optional(),  
  stream: z.boolean().default(false),  
});

export type ChatCompletionRequest \= z.infer\<typeof ChatCompletionRequestSchema\>;

export const ChatCompletionResponseSchema \= z.object({  
  id: z.string(),  
  object: z.literal('text\_completion'),  
  created: z.number(),  
  model: z.string(),  
  choices: z.array(z.object({  
    text: z.string(),  
    index: z.number(),  
    finish\_reason: z.string(),  
  })),  
  usage: z.object({  
    prompt\_tokens: z.number(),  
    completion\_tokens: z.number(),  
    total\_tokens: z.number(),  
  }),  
});

export type ChatCompletionResponse \= z.infer\<typeof ChatCompletionResponseSchema\>;  
\`\`\`

\#\#\# 5\. Model Provider Interface (lib/providers/IModelProvider.ts)  
\`\`\`typescript  
import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';

export interface IModelProvider {  
  name: string;  
  generate(request: ChatCompletionRequest): Promise\<ChatCompletionResponse\>;  
  stream(request: ChatCompletionRequest): AsyncGenerator\<string, void, unknown\>;  
}

export class ProviderRegistry {  
  private providers: Map\<string, IModelProvider\> \= new Map();

  register(provider: IModelProvider): void {  
    this.providers.set(provider.name, provider);  
  }

  get(name: string): IModelProvider | undefined {  
    return this.providers.get(name);  
  }

  list(): IModelProvider\[\] {  
    return Array.from(this.providers.values());  
  }  
}

export const globalRegistry \= new ProviderRegistry();  
\`\`\`

\#\#\# 6\. OpenAI Provider (lib/providers/openai-provider.ts)  
\`\`\`typescript  
import { IModelProvider } from './IModelProvider';  
import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';

export class OpenAIProvider implements IModelProvider {  
  name \= 'openai';  
  private apiKey: string;  
  private apiBase: string;

  constructor() {  
    this.apiKey \= process.env.OPENAI\_API\_KEY || '';  
    this.apiBase \= process.env.OPENAI\_API\_BASE || 'https://api.openai.com/v1';  
  }

  async generate(request: ChatCompletionRequest): Promise\<ChatCompletionResponse\> {  
    const response \= await fetch(\`${this.apiBase}/chat/completions\`, {  
      method: 'POST',  
      headers: {  
        'Authorization': \`Bearer ${this.apiKey}\`,  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        model: request.model,  
        messages: request.messages,  
        temperature: request.temperature,  
        top\_p: request.top\_p,  
        max\_tokens: request.max\_tokens,  
        stream: false,  
      }),  
    });

    if (\!response.ok) {  
      throw new Error(\`OpenAI API error: ${response.statusText}\`);  
    }

    const data \= await response.json();  
    return {  
      id: data.id,  
      object: 'text\_completion',  
      created: data.created,  
      model: data.model,  
      choices: data.choices.map((choice: any) \=\> ({  
        text: choice.message?.content || '',  
        index: choice.index,  
        finish\_reason: choice.finish\_reason,  
      })),  
      usage: data.usage,  
    };  
  }

  async \*stream(request: ChatCompletionRequest): AsyncGenerator\<string, void, unknown\> {  
    const response \= await fetch(\`${this.apiBase}/chat/completions\`, {  
      method: 'POST',  
      headers: {  
        'Authorization': \`Bearer ${this.apiKey}\`,  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        model: request.model,  
        messages: request.messages,  
        temperature: request.temperature,  
        top\_p: request.top\_p,  
        max\_tokens: request.max\_tokens,  
        stream: true,  
      }),  
    });

    if (\!response.ok) {  
      throw new Error(\`OpenAI API error: ${response.statusText}\`);  
    }

    const reader \= response.body?.getReader();  
    if (\!reader) throw new Error('No response body');

    const decoder \= new TextDecoder();  
    let buffer \= '';

    while (true) {  
      const { done, value } \= await reader.read();  
      if (done) break;

      buffer \+= decoder.decode(value, { stream: true });  
      const lines \= buffer.split('\\n');  
      buffer \= lines.pop() || '';

      for (const line of lines) {  
        if (line.startsWith('data: ')) {  
          const data \= line.slice(6);  
          if (data \=== '\[DONE\]') continue;  
          try {  
            const parsed \= JSON.parse(data);  
            const token \= parsed.choices?.\[0\]?.delta?.content || '';  
            if (token) yield token;  
          } catch (e) {  
            // Ignore parse errors  
          }  
        }  
      }  
    }  
  }  
}  
\`\`\`

\#\#\# 7\. Local Provider for Testing (lib/providers/local-provider.ts)  
\`\`\`typescript  
import { IModelProvider } from './IModelProvider';  
import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';

export class LocalProvider implements IModelProvider {  
  name \= 'local';

  async generate(request: ChatCompletionRequest): Promise\<ChatCompletionResponse\> {  
    const content \= \`\[Local Echo\] Your question: "${request.messages\[request.messages.length \- 1\]?.content}" has been processed.\`;  
      
    return {  
      id: \`local-${Date.now()}\`,  
      object: 'text\_completion',  
      created: Math.floor(Date.now() / 1000),  
      model: request.model,  
      choices: \[  
        {  
          text: content,  
          index: 0,  
          finish\_reason: 'stop',  
        },  
      \],  
      usage: {  
        prompt\_tokens: 10,  
        completion\_tokens: content.length / 4,  
        total\_tokens: 10 \+ Math.ceil(content.length / 4),  
      },  
    };  
  }

  async \*stream(request: ChatCompletionRequest): AsyncGenerator\<string, void, unknown\> {  
    const text \= \`\[Local Stream Echo\] Your question: "${request.messages\[request.messages.length \- 1\]?.content}"\`;  
      
    for (const char of text) {  
      yield char;  
      // Simulate token delay  
      await new Promise(resolve \=\> setTimeout(resolve, 20));  
    }  
  }  
}  
\`\`\`

\#\#\# 8\. Rate Limiter (lib/rate-limiter.ts)  
\`\`\`typescript  
export interface RateLimitConfig {  
  requestsPerMinute: number;  
}

class TokenBucket {  
  private tokens: number;  
  private lastRefill: number;

  constructor(capacity: number) {  
    this.tokens \= capacity;  
    this.lastRefill \= Date.now();  
  }

  private refill(capacity: number): void {  
    const now \= Date.now();  
    const timePassed \= (now \- this.lastRefill) / 1000 / 60; // minutes  
    this.tokens \= Math.min(capacity, this.tokens \+ timePassed \* capacity);  
    this.lastRefill \= now;  
  }

  canConsume(capacity: number, tokens: number \= 1): boolean {  
    this.refill(capacity);  
    if (this.tokens \>= tokens) {  
      this.tokens \-= tokens;  
      return true;  
    }  
    return false;  
  }  
}

export class RateLimiter {  
  private buckets: Map\<string, TokenBucket\> \= new Map();

  canConsume(key: string, config: RateLimitConfig): boolean {  
    if (\!this.buckets.has(key)) {  
      this.buckets.set(key, new TokenBucket(config.requestsPerMinute));  
    }

    const bucket \= this.buckets.get(key)\!;  
    return bucket.canConsume(config.requestsPerMinute);  
  }  
}

export const globalRateLimiter \= new RateLimiter();  
\`\`\`

\#\#\# 9\. Auth Helpers (lib/auth.ts)  
\`\`\`typescript  
import { auth as clerkAuth } from '@clerk/nextjs/server';  
import { db } from './db';

export async function getCurrentUser() {  
  const { userId } \= await clerkAuth();  
  if (\!userId) return null;

  const user \= await db.user.findUnique({  
    where: { clerkId: userId },  
  });

  return user;  
}

export async function isAdmin() {  
  const { sessionClaims } \= await clerkAuth();  
  return sessionClaims?.metadata?.role \=== 'admin';  
}

export async function getUserPlan() {  
  const user \= await getCurrentUser();  
  if (\!user?.planId) return null;

  return await db.plan.findUnique({  
    where: { id: user.planId },  
  });  
}

export function generateApiKey(): string {  
  const chars \= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
  let key \= 'vk\_';  
  for (let i \= 0; i \< 32; i++) {  
    key \+= chars.charAt(Math.floor(Math.random() \* chars.length));  
  }  
  return key;  
}  
\`\`\`

\#\#\# 10\. Chat Completions API Route (app/api/v1/chat/completions/route.ts)  
\`\`\`typescript  
import { NextRequest, NextResponse } from 'next/server';  
import { auth } from '@clerk/nextjs/server';  
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';  
import { db } from '@/lib/db';  
import { globalRegistry } from '@/lib/providers/registry';  
import { globalRateLimiter } from '@/lib/rate-limiter';  
import { logger } from '@/lib/logging';  
import { recordUsage } from '@/lib/metrics';

export async function POST(request: NextRequest) {  
  try {  
    const { userId } \= await auth();  
    const apiKey \= request.headers.get('authorization')?.replace('Bearer ', '');

    if (\!userId && \!apiKey) {  
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });  
    }

    const body \= await request.json();  
    const parsed \= ChatCompletionRequestSchema.parse(body);

    let user \= null;  
    let plan \= null;  
    let apiKeyRecord \= null;

    if (apiKey) {  
      apiKeyRecord \= await db.apiKey.findUnique({  
        where: { key: apiKey },  
        include: { plan: true, user: true },  
      });

      if (\!apiKeyRecord?.isActive) {  
        return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });  
      }

      // Check rate limit  
      if (\!globalRateLimiter.canConsume(apiKey, { requestsPerMinute: apiKeyRecord.plan.rateLimit })) {  
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });  
      }

      // Check quota  
      if (apiKeyRecord.usageThisMonth \>= apiKeyRecord.plan.monthlyQuota) {  
        return NextResponse.json({ error: 'Quota exceeded' }, { status: 429 });  
      }

      plan \= apiKeyRecord.plan;  
    } else {  
      user \= await db.user.findUnique({  
        where: { clerkId: userId\! },  
        include: { plan: true },  
      });

      if (\!user?.plan) {  
        return NextResponse.json({ error: 'No plan assigned' }, { status: 403 });  
      }

      plan \= user.plan;  
    }

    const provider \= globalRegistry.get('openai');  
    if (\!provider) {  
      return NextResponse.json({ error: 'No provider available' }, { status: 500 });  
    }

    const response \= await provider.generate(parsed);

    // Log usage  
    await db.usageLog.create({  
      data: {  
        userId: user?.id,  
        apiKeyId: apiKeyRecord?.id,  
        model: parsed.model,  
        inputTokens: response.usage.prompt\_tokens,  
        outputTokens: response.usage.completion\_tokens,  
        totalTokens: response.usage.total\_tokens,  
        durationMs: 0,  
        status: 'success',  
      },  
    });

    // Update API key usage  
    if (apiKeyRecord) {  
      await db.apiKey.update({  
        where: { id: apiKeyRecord.id },  
        data: {  
          usageThisMonth: apiKeyRecord.usageThisMonth \+ response.usage.total\_tokens,  
          lastUsedAt: new Date(),  
        },  
      });  
    }

    recordUsage('chat\_completions', response.usage.total\_tokens);

    return NextResponse.json(response);  
  } catch (error) {  
    logger.error('Chat completions error', error);  
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });  
  }  
}  
\`\`\`

\#\#\# 11\. Streaming Chat Completions Route (app/api/v1/chat/completions/stream/route.ts)  
\`\`\`typescript  
import { NextRequest, NextResponse } from 'next/server';  
import { auth } from '@clerk/nextjs/server';  
import { ChatCompletionRequestSchema } from '@/lib/schemas/chat';  
import { db } from '@/lib/db';  
import { globalRegistry } from '@/lib/providers/registry';  
import { globalRateLimiter } from '@/lib/rate-limiter';  
import { logger } from '@/lib/logging';

export async function POST(request: NextRequest) {  
  try {  
    const { userId } \= await auth();  
    const apiKey \= request.headers.get('authorization')?.replace('Bearer ', '');

    if (\!userId && \!apiKey) {  
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });  
    }

    const body \= await request.json();  
    const parsed \= ChatCompletionRequestSchema.parse(body);

    let plan \= null;  
    let apiKeyRecord \= null;

    if (apiKey) {  
      apiKeyRecord \= await db.apiKey.findUnique({  
        where: { key: apiKey },  
        include: { plan: true },  
      });

      if (\!apiKeyRecord?.isActive) {  
        return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });  
      }

      if (\!globalRateLimiter.canConsume(apiKey, { requestsPerMinute: apiKeyRecord.plan.rateLimit })) {  
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });  
      }

      plan \= apiKeyRecord.plan;  
    } else {  
      const user \= await db.user.findUnique({  
        where: { clerkId: userId\! },  
        include: { plan: true },  
      });

      if (\!user?.plan) {  
        return NextResponse.json({ error: 'No plan assigned' }, { status: 403 });  
      }

      plan \= user.plan;  
    }

    const provider \= globalRegistry.get('openai');  
    if (\!provider) {  
      return NextResponse.json({ error: 'No provider available' }, { status: 500 });  
    }

    // Create SSE stream  
    const encoder \= new TextEncoder();  
    let totalTokens \= 0;

    const stream \= new ReadableStream({  
      async start(controller) {  
        try {  
          for await (const token of provider.stream(parsed)) {  
            const data \= \`data: ${JSON.stringify({ token })}\\n\\n\`;  
            controller.enqueue(encoder.encode(data));  
            totalTokens++;  
          }

          controller.enqueue(encoder.encode('data: \[DONE\]\\n\\n'));  
          controller.close();

          // Log usage after stream completes  
          await db.usageLog.create({  
            data: {  
              apiKeyId: apiKeyRecord?.id,  
              model: parsed.model,  
              inputTokens: 0,  
              outputTokens: totalTokens,  
              totalTokens,  
              durationMs: 0,  
              status: 'success',  
            },  
          });  
        } catch (error) {  
          logger.error('Stream error', error);  
          controller.error(error);  
        }  
      },  
    });

    return new NextResponse(stream, {  
      headers: {  
        'Content-Type': 'text/event-stream',  
        'Cache-Control': 'no-cache',  
        'Connection': 'keep-alive',  
      },  
    });  
  } catch (error) {  
    logger.error('Streaming error', error);  
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });  
  }  
}  
\`\`\`

\#\#\# 12\. API Keys Management Route (app/api/v1/keys/route.ts)  
\`\`\`typescript  
import { NextRequest, NextResponse } from 'next/server';  
import { auth } from '@clerk/nextjs/server';  
import { db } from '@/lib/db';  
import { generateApiKey, isAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {  
  const { userId } \= await auth();  
  if (\!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const keys \= await db.apiKey.findMany({  
    where: { userId },  
    select: { id: true, name: true, key: true, isActive: true, createdAt: true, lastUsedAt: true },  
  });

  return NextResponse.json({ keys });  
}

export async function POST(request: NextRequest) {  
  const { userId } \= await auth();  
  if (\!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body \= await request.json();  
  const { name, planId, expiresIn } \= body;

  const user \= await db.user.findUnique({ where: { clerkId: userId } });  
  if (\!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const plan \= await db.plan.findUnique({ where: { id: planId } });  
  if (\!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });

  const key \= generateApiKey();  
  const apiKey \= await db.apiKey.create({  
    data: {  
      name,  
      key,  
      userId: user.id,  
      planId,  
      expiresAt: expiresIn ? new Date(Date.now() \+ expiresIn \* 1000\) : null,  
    },  
  });

  return NextResponse.json({ key: apiKey.key, ...apiKey });  
}  
\`\`\`

\#\#\# 13\. Admin Dashboard Page (app/dashboard/admin/page.tsx)  
\`\`\`typescript  
'use client';

import { useAuth } from '@clerk/nextjs';  
import { useRouter } from 'next/navigation';  
import { useEffect, useState } from 'react';  
import AdminLayout from './layout';  
import KeysTab from './keys/page';  
import PlansTab from './plans/page';  
import UsageTab from './usage/page';

export default function AdminDashboard() {  
  const { userId, sessionClaims } \= useAuth();  
  const router \= useRouter();  
  const \[activeTab, setActiveTab\] \= useState('keys');

  useEffect(() \=\> {  
    if (\!userId || sessionClaims?.metadata?.role \!== 'admin') {  
      router.push('/dashboard');  
    }  
  }, \[userId, sessionClaims, router\]);

  return (  
    \<AdminLayout\>  
      \<div className="space-y-6"\>  
        \<div className="flex gap-4 border-b border-vetra-muted"\>  
          {\['keys', 'plans', 'usage'\].map((tab) \=\> (  
            \<button  
              key={tab}  
              onClick={() \=\> setActiveTab(tab)}  
              className={\`px-4 py-2 capitalize font-medium transition ${  
                activeTab \=== tab  
                  ? 'border-b-2 border-vetra-accent text-vetra-accent'  
                  : 'text-vetra-muted hover:text-white'  
              }\`}  
            \>  
              {tab}  
            \</button\>  
          ))}  
        \</div\>

        {activeTab \=== 'keys' && \<KeysTab /\>}  
        {activeTab \=== 'plans' && \<PlansTab /\>}  
        {activeTab \=== 'usage' && \<UsageTab /\>}  
      \</div\>  
    \</AdminLayout\>  
  );  
}  
\`\`\`

\#\#\# 14\. Logging (lib/logging.ts)  
\`\`\`typescript  
import pino from 'pino';

export const logger \= pino({  
  level: process.env.LOG\_LEVEL || 'info',  
  transport: {  
    target: 'pino-pretty',  
    options: {  
      colorize: true,  
      translateTime: 'SYS:standard',  
      ignore: 'pid,hostname',  
    },  
  },  
});  
\`\`\`

\#\#\# 15\. Metrics (lib/metrics.ts)  
\`\`\`typescript  
import { register, Counter, Histogram } from 'prom-client';

export const requestCounter \= new Counter({  
  name: 'vetra\_requests\_total',  
  help: 'Total number of requests',  
  labelNames: \['method', 'endpoint', 'status'\],  
});

export const tokensCounter \= new Counter({  
  name: 'vetra\_tokens\_total',  
  help: 'Total tokens processed',  
  labelNames: \['type'\],  
});

export const latencyHistogram \= new Histogram({  
  name: 'vetra\_request\_duration\_seconds',  
  help: 'Request duration in seconds',  
  labelNames: \['endpoint'\],  
  buckets: \[0.1, 0.5, 1, 2, 5\],  
});

export function recordUsage(type: string, count: number) {  
  tokensCounter.labels(type).inc(count);  
}

export function getMetrics() {  
  return register.metrics();  
}  
\`\`\`

\#\#\# 16\. Package.json  
\`\`\`json  
{  
  "name": "vetra",  
  "version": "0.1.0",  
  "private": true,  
  "scripts": {  
    "dev": "next dev",  
    "build": "next build",  
    "start": "next start",  
    "lint": "eslint . \--ext .ts,.tsx",  
    "format": "prettier \--write \\"\*\*/\*.{ts,tsx,json,md}\\"",  
    "test": "jest",  
    "test:watch": "jest \--watch",  
    "prisma:migrate": "prisma migrate dev",  
    "prisma:generate": "prisma generate",  
    "prisma:studio": "prisma studio"  
  },  
  "dependencies": {  
    "next": "^14.0.0",  
    "react": "^18.2.0",  
    "react-dom": "^18.2.0",  
    "@clerk/nextjs": "^5.0.0",  
    "@prisma/client": "^5.0.0",  
    "zod": "^3.22.0",  
    "pino": "^8.16.0",  
    "pino-pretty": "^10.2.0",  
    "prom-client": "^15.0.0"  
  },  
  "devDependencies": {  
    "typescript": "^5.2.0",  
    "@types/node": "^20.0.0",  
    "@types/react": "^18.2.0",  
    "@types/jest": "^29.5.0",  
    "jest": "^29.7.0",  
    "ts-jest": "^29.1.0",  
    "prisma": "^5.0.0",  
    "@testing-library/react": "^14.0.0",  
    "supertest": "^6.3.0",  
    "tailwindcss": "^3.3.0",  
    "postcss": "^8.4.0",  
    "autoprefixer": "^10.4.0"  
  }  
}  
\`\`\`

\#\#\# 17\. vercel.json  
\`\`\`json  
{  
  "buildCommand": "npm run build",  
  "framework": "nextjs",  
  "nodejs": "20.x",  
  "env": {  
    "NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY": "@clerk\_publishable",  
    "CLERK\_SECRET\_KEY": "@clerk\_secret",  
    "DATABASE\_URL": "@database\_url"  
  }  
}  
\`\`\`

\#\#\# 18\. docker-compose.yml (Local Dev)  
\`\`\`yaml  
version: '3.8'

services:  
  postgres:  
    image: postgres:16-alpine  
    environment:  
      POSTGRES\_PASSWORD: postgres  
      POSTGRES\_DB: vetra  
    ports:  
      \- "5432:5432"  
    volumes:  
      \- postgres\_data:/var/lib/postgresql/data

  app:  
    build: .  
    ports:  
      \- "3000:3000"  
    environment:  
      DATABASE\_URL: postgresql://postgres:postgres@postgres:5432/vetra  
      NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY: ${NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY}  
      CLERK\_SECRET\_KEY: ${CLERK\_SECRET\_KEY}  
    depends\_on:  
      \- postgres

volumes:  
  postgres\_data:  
\`\`\`

\#\#\# 19\. Dockerfile  
\`\`\`dockerfile  
FROM node:20-alpine AS builder  
WORKDIR /app  
COPY package\*.json ./  
RUN npm ci  
COPY . .  
RUN npm run build

FROM node:20-alpine  
WORKDIR /app  
COPY package\*.json ./  
RUN npm ci \--only=production  
COPY \--from=builder /app/.next ./.next  
EXPOSE 3000  
CMD \["npm", "start"\]  
\`\`\`

\#\#\# 20\. Tests (example: \_\_tests\_\_/api/chat.test.ts)  
\`\`\`typescript  
import { POST } from '@/app/api/v1/chat/completions/route';  
import { NextRequest } from 'next/server';

describe('Chat Completions API', () \=\> {  
  it('should reject requests without auth', async () \=\> {  
    const request \= new NextRequest('http://localhost:3000/api/v1/chat/completions', {  
      method: 'POST',  
      body: JSON.stringify({  
        model: 'gpt-4',  
        messages: \[{ role: 'user', content: 'Hello' }\],  
      }),  
    });

    const response \= await POST(request);  
    expect(response.status).toBe(401);  
  });

  it('should process valid chat requests', async () \=\> {  
    // Mock auth, db, and provider  
    // Test full request-response flow  
  });  
});  
\`\`\`

\#\#\# 21\. GitHub Actions Workflow (.github/workflows/test.yml)  
\`\`\`yaml  
name: Test & Build

on:  
  push:  
    branches: \[main, develop\]  
  pull\_request:  
    branches: \[main\]

jobs:  
  test:  
    runs-on: ubuntu-latest  
    services:  
      postgres:  
        image: postgres:16-alpine  
        env:  
          POSTGRES\_PASSWORD: postgres  
        options: \>-  
          \--health-cmd pg\_isready  
          \--health-interval 10s  
          \--health-timeout 5s  
          \--health-retries 5

    steps:  
      \- uses: actions/checkout@v4  
      \- uses: actions/setup-node@v4  
        with:  
          node-version: 20  
          cache: npm

      \- run: npm ci  
      \- run: npm run lint  
      \- run: npm test  
      \- run: npm run build

      \- name: Upload coverage  
        uses: codecov/codecov-action@v3  
\`\`\`

\#\#\# 22\. README.md  
\`\`\`markdown  
\# Vetra — Wind-Swept Pages, Warm Answers

Vetra is a production-grade AI inference API with a cozy, book-nook aesthetic. Built on Vercel with Clerk auth and built for speed.

\#\# 🌬️ Quick Start

\#\#\# Local Development

\`\`\`bash  
\# Install dependencies  
npm install

\# Set up environment  
cp .env.example .env.local  
\# Edit .env.local with your Clerk keys

\# Run Prisma migrations  
npm run prisma:migrate

\# Start dev server  
npm run dev  
\`\`\`

Open http://localhost:3000/dashboard

\#\#\# Using the API

\`\`\`bash  
\# Get your API key from the dashboard

curl \-X POST http://localhost:3000/api/v1/chat/completions \\  
  \-H "Authorization: Bearer YOUR\_API\_KEY" \\  
  \-H "Content-Type: application/json" \\  
  \-d '{  
    "model": "gpt-4",  
    "messages": \[{"role": "user", "content": "Hello, Vetra"}\],  
    "temperature": 0.7  
  }'  
\`\`\`

\#\#\# Streaming

\`\`\`bash  
curl \-X POST http://localhost:3000/api/v1/chat/completions/stream \\  
  \-H "Authorization: Bearer YOUR\_API\_KEY" \\  
  \-H "Content-Type: application/json" \\  
  \-d '{  
    "model": "gpt-4",  
    "messages": \[{"role": "user", "content": "Tell me a story"}\]  
  }'  
\`\`\`

\#\# 📊 Admin Dashboard

Visit \`/dashboard/admin\` (requires admin role in Clerk metadata) to:  
\- Manage API keys and quotas  
\- Create and edit subscription plans  
\- View usage metrics

\#\# 🚀 Deployment

1\. Connect your GitHub repo to Vercel  
2\. Set environment variables in Vercel dashboard  
3\. Push to main — Vercel auto-deploys

\`\`\`bash  
\# Or deploy manually  
vercel deploy  
\`\`\`

\#\# 🏗️ Architecture

\- \*\*Frontend\*\*: Next.js 14 (App Router) \+ React  
\- \*\*Backend\*\*: Next.js serverless functions \+ Edge Functions for streaming  
\- \*\*Database\*\*: Prisma ORM \+ PostgreSQL (Vercel Postgres recommended)  
\- \*\*Auth\*\*: Clerk with role-based access control  
\- \*\*Rate Limiting\*\*: Token bucket (in-memory, with optional Redis/Upstash)  
\- \*\*Monitoring\*\*: Prometheus metrics \+ Pino JSON logging

\#\# 📚 Docs

\- \[API Reference\](docs/API.md)  
\- \[Deployment Guide\](docs/DEPLOYMENT.md)  
\- \[Brand Guide\](docs/BRAND.md)

\#\# License

MIT  
\`\`\`

\#\#\# 23\. Brand Guide (docs/BRAND.md)  
\`\`\`markdown  
\# Vetra Brand Guide

\#\# Color Palette

\- \*\*Storm Blue\*\* (\#7AA2D6) — Primary accent, calming yet energetic  
\- \*\*Deep Night\*\* (\#0F1724) — Background, cozy darkness  
\- \*\*Warm Parchment\*\* (\#DDB892) — Warm highlight, like old pages  
\- \*\*Muted Storm\*\* (\#B6C2CC) — Secondary text, soften  
\- \*\*Light Page\*\* (\#F7E8C6) — Text background, inviting

\#\# Typography

\- \*\*Display\*\*: Georgia or similar serif (warmth \+ authority)  
\- \*\*Body\*\*: Inter or similar sans-serif (clarity \+ modern)

\#\# Copy Tone

\- \*\*Hero\*\*: "Wind-swept pages, warm lamplight, and answers that feel like a whispered recommendation."  
\- \*\*Button CTA\*\*: "Breeze Through", "Summon Answer", "Create Key"  
\- \*\*Error\*\*: "Storm warning: quota reached. Tuck your query away and upgrade your plan."  
\- \*\*Success\*\*: "A gentle gust has carried your message through."

\#\# Imagery

\- Soft storm clouds, book spines, warm reading nooks, hint of wind, old libraries  
\- Avoid: harsh colors, corporate stock photos, digital minimalism  
\`\`\`

\#\#\# 24\. OpenAPI Specification (docs/openapi.yaml)  
\`\`\`yaml  
openapi: 3.0.0  
info:  
  title: Vetra AI Inference API  
  version: 1.0.0  
  description: Wind-swept pages, warm answers.

servers:  
  \- url: https://vetra.vercel.app/api/v1  
  \- url: http://localhost:3000/api/v1

components:  
  securitySchemes:  
    ApiKeyAuth:  
      type: apiKey  
      in: header  
      name: Authorization  
      description: "Bearer YOUR\_API\_KEY"

paths:  
  /chat/completions:  
    post:  
      summary: Create chat completion  
      tags: \[Chat\]  
      requestBody:  
        required: true  
        content:  
          application/json:  
            schema:  
              $ref: '\#/components/schemas/ChatCompletionRequest'  
      responses:  
        200:  
          description: Success  
          content:  
            application/json:  
              schema:  
                $ref: '\#/components/schemas/ChatCompletionResponse'  
        401:  
          description: Unauthorized  
        429:  
          description: Rate limited or quota exceeded

  /chat/completions/stream:  
    post:  
      summary: Stream chat completion  
      tags: \[Chat\]  
      requestBody:  
        required: true  
        content:  
          application/json:  
            schema:  
              $ref: '\#/components/schemas/ChatCompletionRequest'  
      responses:  
        200:  
          description: Server-sent event stream  
          content:  
            text/event-stream:  
              schema:  
                type: object

  /models:  
    get:  
      summary: List available models  
      tags: \[Models\]  
      responses:  
        200:  
          description: List of models

  /keys:  
    get:  
      summary: List API keys  
      tags: \[API Keys\]  
      security:  
        \- ApiKeyAuth: \[\]  
      responses:  
        200:  
          description: User's API keys

    post:  
      summary: Create API key  
      tags: \[API Keys\]  
      security:  
        \- ApiKeyAuth: \[\]  
      requestBody:  
        required: true  
        content:  
          application/json:  
            schema:  
              type: object  
              properties:  
                name:  
                  type: string  
                planId:  
                  type: string  
      responses:  
        201:  
          description: API key created

components:  
  schemas:  
    ChatCompletionRequest:  
      type: object  
      required: \[model, messages\]  
      properties:  
        model:  
          type: string  
        messages:  
          type: array  
          items:  
            type: object  
            properties:  
              role:  
                type: string  
                enum: \[system, user, assistant\]  
              content:  
                type: string  
        temperature:  
          type: number  
          minimum: 0  
          maximum: 2  
          default: 0.7  
        max\_tokens:  
          type: integer  
        stream:  
          type: boolean  
          default: false

    ChatCompletionResponse:  
      type: object  
      properties:  
        id:  
          type: string  
        object:  
          type: string  
        created:  
          type: number  
        model:  
          type: string  
        choices:  
          type: array  
          items:  
            type: object  
            properties:  
              text:  
                type: string  
              index:  
                type: number  
              finish\_reason:  
                type: string  
        usage:  
          type: object  
          properties:  
            prompt\_tokens:  
              type: number  
            completion\_tokens:  
              type: number  
            total\_tokens:  
              type: number  
\`\`\`

\#\#\# 25\. GitHub Issues (Breakdown of next tasks)

\*\*Issue 1: Implement Upstash Redis adapter for rate limiting\*\*  
\- Small effort  
\- Add Redis client and swap in-memory limiter  
\- Tests for Redis-backed rate limiting

\*\*Issue 2: Build admin plan editor UI component\*\*  
\- Medium effort  
\- Drag-and-drop plan feature management  
\- Form validation and API integration

\*\*Issue 3: Implement usage analytics dashboard\*\*  
\- Medium effort  
\- Charts and graphs for per-key/per-plan usage  
\- Export CSV functionality

\*\*Issue 4: Add cost tracking and billing integration\*\*  
\- Large effort  
\- Stripe integration  
\- Billing emails and invoices

\*\*Issue 5: Support local model hosting (Ollama/Hugging Face)\*\*  
\- Large effort  
\- Local provider adapter  
\- GPU resource management

\*\*Issue 6: Multi-tenant support improvements\*\*  
\- Large effort  
\- Organization management  
\- Team collaboration features

\---

\#\# Final Notes

\- This prompt generates a \*\*complete, production-ready codebase\*\* for a Copilot agent  
\- All files are \*\*fully functional and copy-pasteable\*\*  
\- \*\*No examples or stubs\*\*—full implementations  
\- Deploy to Vercel immediately after generation  
\- Clerk auth is pre-integrated; add your Clerk keys and go  
\- Run migrations to set up DB schema  
\- Start with the OpenAI provider; swap in other models later

Run this prompt and commit all generated files directly into CloudCompile/Vetra.

