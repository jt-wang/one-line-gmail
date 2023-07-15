"use strict";

function addScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);
    (document.body || document.head || document.documentElement).appendChild(script);
}

addScript("gmailJsLoader.js");

const port = chrome.runtime.connect({name: "one-line-gmail-content-background-communication"});

document.addEventListener('GET_PROVIDER_CONFIG', function(e) {
    // console.log('receive extension.js message in extensionInjector.js: ', e);
    port.postMessage(e);
});

port.onMessage.addListener((message) => {
    // console.log('receive background response in extensionInjector.js: ', message);
    document.dispatchEvent(new CustomEvent('MyExtensionResponse', {
          detail: message
    }));
});

addScript("extension.js");

