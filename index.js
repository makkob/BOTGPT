const TelegramApi = require("node-telegram-bot-api");
const openai = require("@openai/api");
require("dotenv").config();

const TG_TOKEN = process.env.TG_TOKEN;
const OPENAI_API_SECRET_KEY = process.env.OPENAI_API_SECRET_KEY;

const bot = new TelegramApi(TG_TOKEN, { polling: true });

// Initialize the OpenAI API client
openai.api_key = OPENAI_API_SECRET_KEY;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Generate a response using the OpenAI API
  const prompt = `Q: ${text}\nA:`;
  const response = await openai.completions.create({
    engine: "davinci",
    prompt: prompt,
    max_tokens: 100,
  });

  // Extract the response text from the OpenAI API response
  const responseText = response.choices[0].text;

  // Send the response text back to the user
  bot.sendMessage(chatId, responseText);
});
