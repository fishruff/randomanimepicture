const { Telegraf } = require("telegraf");
const dotnev = require("dotenv");
const { default: axios } = require("axios");

dotnev.config();
const bot = new Telegraf(process.env.BOT_TOKEN || "");
const getUrl = (psi, seed) =>
  "https://thisanimedoesnotexist.ai/results/psi-" +
  psi +
  "/seed" +
  seed +
  ".png";

bot.hears("Дай тян", (ctx) => {
  const url = getUrl(
    (Math.round(random(0.3, 2.0) * 10) / 10).toFixed(1),
    ~~random(10000, 99999)
  );
  ctx.replyWithPhoto(url);
});

bot.start(async (ctx) => {
  ctx.reply("Hello!", {
    reply_markup: {
      keyboard: [[{ text: "Дай тян" }]],
      resize_keyboard: true,
    },
  });
}); //ответ бота на команду /start
bot.help((ctx) => ctx.reply("Send me a sticker")); //ответ бота на команду /help
bot.on("sticker", (ctx) => ctx.reply("")); //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears("hi", (ctx) => ctx.reply("Hey there")); // bot.hears это обработчик конкретного текста, данном случае это - "hi"

bot.launch().then((e) => {
  console.log("started");
}); // запуск бота

const random = (start = 0, end = 100) => Math.random() * (end - start) + start;
