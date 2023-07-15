import Browser from 'webextension-polyfill'

import { getProviderConfigs, ProviderType } from '../config'

Browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'OPEN_OPTIONS_PAGE') {
    Browser.runtime.openOptionsPage()
  }
})

Browser.runtime.onConnect.addListener(async (port) => {
  if (port.name == 'one-line-gmail-content-background-communication') {
    port.onMessage.addListener(async (message) => {
      // console.log('receive extensionInjector message in background: ', message);
        const providerConfigs = await getProviderConfigs()
        // console.log('providerConfigs in background: ', providerConfigs)
        port.postMessage(providerConfigs.configs[ProviderType.GPT3])
    })
  }
})

Browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    Browser.runtime.openOptionsPage()
  }
})
