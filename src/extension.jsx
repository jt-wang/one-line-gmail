'use strict'

import { convert } from 'html-to-text'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import './Modal.css'
import OpenAI from './providers/openai'

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
    const openAI = new OpenAI(apiKey, model)
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

        const emailBodyParentElement = document.getElementsByClassName('ii gt ')[0]
        if (emailBodyParentElement) {
          document.getElementsByClassName('a3s aiL ')[0].innerHTML = ''
          ReactDOM.render(
            <Modal oneLineEmailBody={await openAI.generateAnswer(plainTextEmailBody)} />,
            emailBodyParentElement,
          )
          emailBodyParentElement.classList.add('after_modal_appended')
        }

        // document.getElementsByClassName('a3s aiL ')[0].innerHTML = ''

        // document.getElementsByClassName('a3s aiL ')[0].innerHTML = await openAI.generateAnswer(
        //   plainTextEmailBody,
        // )
      })

      gmail.observe.on('compose', (compose) => {
        console.log('New compose window is opened!', compose)
      })
    })
  })
}
