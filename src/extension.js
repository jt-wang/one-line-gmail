'use strict'

// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(async () => {
  if (!window._gmailjs) {
    return
  }

  clearInterval(loaderId)
  await startExtension(window._gmailjs)
}, 100)

// actual extension-code
async function startExtension(gmail) {
  var getProviderConfigEvent = new CustomEvent('GET_PROVIDER_CONFIG', {
    type: 'GET_PROVIDER_CONFIG',
  })
  
  document.dispatchEvent(getProviderConfigEvent)
  console.log('dispatch from extension.js: ', { type: 'GET_PROVIDER_CONFIG' })

  document.addEventListener('MyExtensionResponse', function (e) {
    console.log('received in extension.js: ', e.detail)
    const { apiKey, model } = e.detail

    const OpenAI = require('./providers/openai').default
    const openAI = new OpenAI(apiKey, model)

    const { convert } = require('html-to-text')

    window.gmail = gmail

    gmail.observe.on('load', () => {
      const userEmail = gmail.get.user_email()
      console.log('Hello, ' + userEmail + '. This is your extension talking!')

      gmail.observe.on('view_email', async (domEmail) => {
        const emailData = gmail.new.get.email_data(domEmail)
        // console.log("Email subject:", emailData.subject);
        const plainTextEmailBody = convert(emailData.body || emailData.content_html).replace(
          /(?:https?):\/\/[\n\S]+/g,
          '',
        )
        console.log('Email body:', plainTextEmailBody)

        document.getElementsByClassName('a3s aiL ')[0].innerHTML = ''

        document.getElementsByClassName('a3s aiL ')[0].innerHTML = await openAI.generateAnswer(
          plainTextEmailBody,
        )
      })

      gmail.observe.on('compose', (compose) => {
        console.log('New compose window is opened!', compose)
      })
    })
  })
}
