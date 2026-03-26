import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';
import { IModelProvider } from './IModelProvider';

export class LocalProvider implements IModelProvider {
  name = 'local';

  async generate(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const lastMessage = request.messages[request.messages.length - 1]?.content ?? '';
    const content = `[Local Echo] Your question: "${lastMessage}" has been processed.`;
    const completionTokens = Math.ceil(content.length / 4);

    return {
      id: `local-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: request.model,
      choices: [
        {
          text: content,
          index: 0,
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: completionTokens,
        total_tokens: 10 + completionTokens,
      },
    };
  }

  async *stream(request: ChatCompletionRequest): AsyncGenerator<string, void, unknown> {
    const lastMessage = request.messages[request.messages.length - 1]?.content ?? '';
    const text = `[Local Stream Echo] Your question: "${lastMessage}"`;

    for (const char of text) {
      yield char;
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }
}
