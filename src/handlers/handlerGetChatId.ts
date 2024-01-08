import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  const user = {
    messageId: ctx.message?.message_id,
  };

  if (ctx.chat?.type !== undefined && ctx.chat?.type !== "private") {
    const group = {
      chatTitle: ctx.chat.title,
      chatId: ctx.chat.id,
      chatLink: "",
    };

    const chat = await ctx.api.getChat(group.chatId);
    group.chatLink = chat.type !== "private" ? (chat.invite_link || "") : "";

    return await ctx.reply(
      `👥 ${group.chatTitle}\n└─ <a href="${group.chatLink}">${group.chatId}</a>\n`,
      {
        reply_parameters: {
          message_id: user.messageId || 0,
        },
        parse_mode: "HTML",
      },
    );
  }

  return await ctx.reply("🐸 Este comando solo está disponible en grupos", {
    reply_parameters: {
      message_id: user.messageId || 0,
    },
  });
};
