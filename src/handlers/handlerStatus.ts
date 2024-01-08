import { check } from "../helpers/utils.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  const time = new Date();

  const user = {
    name: `${ctx.from?.first_name} ${ctx.from?.last_name || ""}`,
    userName: ctx.from?.username,
    userId: ctx.from?.id,
    messageId: ctx.message?.message_id,

    isFree: ctx.session.isNew === false && ctx.session.userData.isFree,
    isPremium: ctx.session.isNew === false && ctx.session.userData.isPremium,
  };

  await ctx.reply(
    `👤 <b>${user.name}\n├─ @${user.userName}</b>\n├─ <a href="tg://user?id=${user.userId}">${user.userId}</a>\n├─ <b>Free:</b> ${
      user.isFree || await check(ctx) ? "Si" : "No"
    }\n└─ <b>Premium:</b> ${
      user.isPremium ? "Si" : "No"
    }\n<blockquote>Para cambiar de status escribe a @hojas_adrian</blockquote>\n<code>${time.getFullYear()}/${
      time.getMonth() + 1
    }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
    {
      parse_mode: "HTML",
      reply_parameters: {
        message_id: ctx.message?.message_id || 0,
      },
    },
  );
};
