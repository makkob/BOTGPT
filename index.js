const TelegramApi = require("node-telegram-bot-api");
// const openai = require("openai");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const TG_TOKEN = process.env.TG_TOKEN;
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const bot = new TelegramApi(TG_TOKEN, { polling: true });

// Initialize the OpenAI API client
openai.api_key = OPENAI_SECRET_KEY;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Generate a response using the OpenAI API
  const prompt = `Q: ${text}\nA:`;
  // const response = await openai.completions.create({
  //   engine: "davinci",
  //   prompt: prompt,
  //   max_tokens: 100,
  // });
  try {
    let completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    // console.log(completion.data.choices[0].text);
    bot.sendMessage(chatId, completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});
