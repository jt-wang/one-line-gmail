const apiKey = "";
const apiModel = "gpt-3.5-turbo";

const prompt =
  "Summarize the following email I give you into 1 short sentence, better to emphasize on the action items I can take from it. Email: ";

export default async function (emailBody) {
  try {
    // send the request containing the messages to the OpenAI API
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [{ role: "user", content: prompt + emailBody }],
      }),
    });

    // check if the API response is ok Else throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status code: ${response.status}`);
    }

    // get the data from the API response as json
    let data = await response.json();

    // check if the API response contains an answer
    if (data && data.choices && data.choices.length > 0) {
      // get the answer from the API response
      let response = data.choices[0].message.content;

      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
