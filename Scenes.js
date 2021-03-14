const Scene = require("telegraf/scenes/base");

class SceneGenerator {
  GenPsiScene() {
    const psi = new Scene("psi");
    psi.enter(async (ctx) => {
      await ctx.reply("Pls write psi (from 0.3 to 2.0)");
    });
    psi.on("text", async (ctx) => {
      const currPsi = Number(ctx.message.text);
      if (currPsi && currPsi >= 0.3 && 2.0 >= currPsi) {
        await ctx.reply("Thx for psi");
        ctx.scene.enter("seed");
      } else {
        ctx.reply("pls enter number-psi(from 0.3 to 2.0)!!!");
        ctx.scene.reenter();
      }
    });
    psi.on("massage", (ctx) => ctx.reply("enter psi!"));
    return psi;
  }
  GenSeedScene() {
    const seed = new Scene("seed");
    seed.enter(async (ctx) => {
      await ctx.reply("Pls write seed (from 10 000 to 99 999)");
    });
    seed.on("text", async (ctx) => {
      const currSeed = Number(ctx.message.text);
      if (currSeed && currSeed >= 10000 && 99999 >= currSeed) {
        await ctx.reply("Thx for seed");
        ctx.scene.enter("url");
      } else {
        ctx.reply("pls enter number-seed(from 10 000 to 99 999)!!!");
        ctx.scene.reenter();
      }
    });
    seed.on("massage", (ctx) => ctx.reply("enter seed!"));
    return seed;
  }
  GenUrlScene() {
    console.log(currPsi);
    console.log(currSeed);
    ctx.scene.leave();
  }
}

module.export = SceneGenerator;
