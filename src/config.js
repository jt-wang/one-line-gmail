import Browser from 'webextension-polyfill'

export const ProviderType = {
  ChatGPT: 'chatgpt',
  GPT3: 'gpt3',
}

export async function getProviderConfigs() {
  const { provider = ProviderType.GPT3 } = await Browser.storage.local.get('provider')
  const configKey = `provider:${ProviderType.GPT3}`
  const result = await Browser.storage.local.get(configKey)
  return {
    provider,
    configs: {
      [ProviderType.GPT3]: result[configKey],
    },
  }
}

export async function saveProviderConfigs(provider, configs) {
  return Browser.storage.local.set({
    provider,
    [`provider:${ProviderType.GPT3}`]: configs[ProviderType.GPT3],
  })
}
