import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';
import { IModelProvider } from './IModelProvider';

export class OpenAIProvider implements IModelProvider {
  name = 'openai';
  private apiKey: string;
  private apiBase: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY ?? '';
    this.apiBase = process.env.OPENAI_API_BASE ?? 'https://api.openai.com/v1';
  }

  async generate(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const response = await fetch(`${this.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature,
        top_p: request.top_p,
        max_tokens: request.max_tokens,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      object: 'text_completion',
      created: data.created,
      model: data.model,
      choices: (Array.isArray(data.choices) ? data.choices : []).map((choice: { message?: { content?: string }; index: number; finish_reason?: string }) => ({
        text: choice.message?.content ?? '',
        index: choice.index,
        finish_reason: choice.finish_reason ?? 'stop',
      })),
      usage: {
        prompt_tokens: data.usage?.prompt_tokens ?? 0,
        completion_tokens: data.usage?.completion_tokens ?? 0,
        total_tokens: data.usage?.total_tokens ?? 0,
      },
    };
  }

  async *stream(request: ChatCompletionRequest): AsyncGenerator<string, void, unknown> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const response = await fetch(`${this.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature,
        top_p: request.top_p,
        max_tokens: request.max_tokens,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const token = parsed?.choices?.[0]?.delta?.content ?? '';
          if (token) yield token;
        } catch {
          // ignore malformed SSE chunks
        }
      }
    }
  }
}
