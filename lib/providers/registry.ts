import { globalRegistry } from './IModelProvider';
import { LocalProvider } from './local-provider';
import { OpenAIProvider } from './openai-provider';

const providers = globalRegistry.list();
if (providers.length === 0) {
  globalRegistry.register(new LocalProvider());
  globalRegistry.register(new OpenAIProvider());
}

export { globalRegistry };
