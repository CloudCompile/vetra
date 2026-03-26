import { ChatCompletionRequest, ChatCompletionResponse } from '@/lib/schemas/chat';

export interface IModelProvider {
  name: string;
  generate(request: ChatCompletionRequest): Promise<ChatCompletionResponse>;
  stream(request: ChatCompletionRequest): AsyncGenerator<string, void, unknown>;
}

export class ProviderRegistry {
  private providers: Map<string, IModelProvider> = new Map();

  register(provider: IModelProvider): void {
    this.providers.set(provider.name, provider);
  }

  get(name: string): IModelProvider | undefined {
    return this.providers.get(name);
  }

  list(): IModelProvider[] {
    return Array.from(this.providers.values());
  }
}

export const globalRegistry = new ProviderRegistry();
