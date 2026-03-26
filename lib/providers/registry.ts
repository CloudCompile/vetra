import { globalRegistry } from './IModelProvider';
import { LocalProvider } from './local-provider';
import { OpenAIProvider } from './openai-provider';

let initialized = false;

function initializeProviders() {
  if (initialized) return;
  initialized = true;
  globalRegistry.register(new LocalProvider());
  globalRegistry.register(new OpenAIProvider());
}

initializeProviders();

export { globalRegistry };
