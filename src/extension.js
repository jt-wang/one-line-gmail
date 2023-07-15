"use strict";

// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(async () => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  await startExtension(window._gmailjs);
}, 100);

// actual extension-code
async function startExtension(gmail) {
  const { convert } = require("html-to-text");

  const openAIQuery = require("./openai").default;

  window.gmail = gmail;

  gmail.observe.on("load", () => {
    const userEmail = gmail.get.user_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    gmail.observe.on("view_email", async (domEmail) => {
      console.log("Looking at email:", domEmail);
      const emailData = gmail.new.get.email_data(domEmail);

      console.log("emailData: ", emailData);

      console.log("Email subject:", emailData.subject);
      const plainTextEmailBody = convert(
        emailData.body || emailData.content_html
      );
      console.log("Email body:", plainTextEmailBody);

      document.getElementsByClassName("a3s aiL ")[0].innerHTML =
        await openAIQuery(plainTextEmailBody);
    });

    gmail.observe.on("compose", (compose) => {
      console.log("New compose window is opened!", compose);
    });
  });
}
