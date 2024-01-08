import { USERS_TO_PREMIUM } from "../helpers/constants.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  if (USERS_TO_PREMIUM.has(ctx.from?.id) && ctx.session.isNew === false) {
    ctx.session.userData.isPremium = true;

    if (ctx.session.userData.isPremium === true) {
      ctx.session.userData.premiumData.plan = "";
    }
    USERS_TO_PREMIUM.delete(ctx.from?.id);

    return await ctx.reply("Ahora eres premium, agrega tu sticker...");
  }
  return await ctx.reply("No puedes hacerte premium");
};
