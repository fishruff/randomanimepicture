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
// Button 2
// bot.hears("Ручной ввод чисel", (ctx) => {
//   bot.enter(async (ctx) =>  await ctx.reply("Pls write psi (from 0.3 to 2.0)"))
//   bot.on('text', async (ctx) => {
//     let psi = Number(ctx.message.text)
//       if(psi && psi >= 0.3 && psi <= 2.0)
//       await ctx.reply('Thx for psi')
//   })

//   const url = getUrl(

//   );
//   ctx.replyWithPhoto(url);
// });

const inline_keyboard = Markup.inlineKeyboard(
  [
    Markup.callbackButton("Yes, send a keyboard", "yes"),
    Markup.callbackButton("No", "no"),
  ],
  {
    columns: 1,
  }
);

const keyboard = Markup.keyboard([["Top"], ["Button 1", "Button 2"]]);

bot.action("no", (ctx) => ctx.answerCbQuery("No so no"));
bot.action("yes", async (ctx) => {
  await ctx.answerCbQuery("Okey");

  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);

  await ctx.reply("Enter Psi", keyboard.resize().extra());
});

bot.start(async (ctx) => {
  ctx.reply(
    "Hello!",
    inline_keyboard.extra()
    //  {
    //   reply_markup: {
    //     keyboard: [[{ text: "Дай тян" },
    //     //  { text: "Ручной ввод чисel" }
    //     ]],
    //     resize_keyboard: true,
    //     т,
    //   },
    // }
  );
});

// const stage = new Stage([psiScene, seedScene]);
// bot.use(session());
// bot.use(stage.middleware());

// bot.command("scenes", async (ctx) => {
//   ctx.scene.enter("psi");
// });
bot.help((ctx) => ctx.reply("wqeqwe")); //ответ бота на команду /help
bot.on("sticker", (ctx) => ctx.reply("")); //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears("hi", (ctx) => ctx.reply("Hey there")); // bot.hears это обработчик конкретного текста, данном случае это - "hi"

bot.launch().then((e) => {
  console.log("started");
}); // запуск бота

const random = (start = 0, end = 100) => Math.random() * (end - start) + start;
