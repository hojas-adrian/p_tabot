import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  const user = {
    name: `${ctx.from?.first_name} ${ctx.from?.last_name || ""}`,
    userName: ctx.from?.username,
    userId: ctx.from?.id,
    messageId: ctx.message?.message_id,
  };

  if (ctx.message?.reply_to_message) {
    user.name = `${ctx.message.reply_to_message.from?.first_name} ${
      ctx.message.reply_to_message.from?.last_name || ""
    }`;
    user.userName = ctx.message.reply_to_message.from?.username;
    user.userId = ctx.message.reply_to_message.from?.id;
  }

  await ctx.reply(
    `👤 ${user.name}\n├─ @${user.userName}\n└─ <a href="tg://user?id=${user.userId}">${user.userId}</a>`,
    {
      parse_mode: "HTML",
      reply_parameters: {
        message_id: user.messageId || 0,
      },
    },
  );
};
