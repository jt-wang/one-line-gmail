export default class OpenAI {
  constructor (token, model) {
  this.token = token
  this.model = model
}
static buildPrompt (emailBody) {
  return `Summarize the following email I give you into 1 short sentence, better to emphasize on the action items I can take from it. Email: ${emailBody}`
}

async generateAnswer (emailBody) {
  try {
    // send the request containing the messages to the OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: "user", content: OpenAI.buildPrompt(emailBody)}],
      }),
    });

    // check if the API response is ok Else throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status code: ${response.status}`);
    }

    // get the data from the API response as json
    const data = await response.json();
    // check if the API response contains an answer
    if (data && data.choices && data.choices.length > 0) {
      // get the answer from the API response
      const result = data.choices[0].message.content;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
}
