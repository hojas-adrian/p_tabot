import { Composer } from "../../deps.ts";
import { spamGroup } from "../helpers/constants.ts";
import { MyContext } from "../types.ts";

const composer = new Composer<MyContext>();

composer
  .filter((ctx) => {
    return ctx.chat?.id === +spamGroup;
  })
  .on("message", async (ctx, next) => {
    if (ctx.session.isNew === false && ctx.session.userData.messageCount < 5) {
      ctx.session.userData.messageCount++;
    }

    await next();
  });

export default composer;
