export function providerNameFromModel(model: string): 'openai' | 'local' {
  return model.startsWith('gpt') || model.startsWith('openai') ? 'openai' : 'local';
}
