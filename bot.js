const { Telegraf } = require("telegraf");
const { Extra, Markup, Stage, session } = Telegraf;
const dotnev = require("dotenv");
const { default: axios } = require("axios");
// const SceneGenerator = require("./Scenes");
// const currScene = new SceneGenerator();
// const psiScene = curr.GenPsiScene();
// const seedScene = curr.GenSeedScene();

dotnev.config();
const bot = new Telegraf(process.env.BOT_TOKEN || "");
const getUrl = (psi, seed) =>
  "https://thisanimedoesnotexist.ai/results/psi-" +
  psi +
  "/seed" +
  seed +
  ".png";
// Button 1
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
});

bot.launch().then((e) => {
  console.log("started");
});

const random = (start = 0, end = 100) => Math.random() * (end - start) + start;
