const TelegramApi = require("node-telegram-bot-api");
// const openai = require("openai");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const { OPENAI_SECRET_KEY, TG_TOKEN } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const bot = new TelegramApi(TG_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const text = msg.text;
    let completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
    });

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
