import { NextFunction } from "../../deps.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  const time = new Date();

  const channelLog = Deno.env.get("CHANNEL_LOG") as string;
  const isPrivate = ctx.chat?.type === "private" ? true : false;

  const user = {
    name: `${ctx.from?.first_name} ${ctx.from?.last_name || ""}`,
    userName: ctx.from?.username,
    userId: ctx.from?.id,
  };

  const group = {
    inPrivate: true,
    chatTitle: "",
    chatId: 0,
    chatLink: "",
  };

  if (
    !ctx.session.isNew && isPrivate &&
    !ctx.session.userData.inPrivate
  ) {
    ctx.session.userData.inPrivate = true;

    await ctx.api.sendMessage(
      channelLog,
      `👤 ${user.name}\n├─ <a href="t.me/${user.userName}">@${user.userName}</a>\n├─ <a href="tg://user?id=${user.userId}">${user.userId}</a>\n└─ #private #a${user.userId}\n<code>${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
      {
        parse_mode: "HTML",
        reply_parameters: {
          message_id: ctx.session.userData.messageId,
        },
      },
    );
  }

  if (ctx.session.isNew) {
    if (ctx.chat?.type !== undefined && ctx.chat?.type !== "private") {
      group.inPrivate = false;
      group.chatTitle = ctx.chat.title;
      group.chatId = ctx.chat.id;

      const chat = await ctx.api.getChat(group.chatId);
      group.chatLink = chat.type !== "private" ? (chat.invite_link || "") : "";
    }

    const msg = await ctx.api.sendMessage(
      channelLog,
      `👤 ${user.name}\n├─ <a href="t.me/${user.userName}">@${user.userName}</a>\n├─ <a href="tg://user?id=${user.userId}">${user.userId}</a>\n└─ #a${user.userId} ${
        group.inPrivate
          ? `#private`
          : `\n\n👥 ${group.chatTitle}\n└─ <a href="${group.chatLink}">${group.chatId}</a>`
      }\n<code>${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
      { parse_mode: "HTML" },
    );

    ctx.session = {
      isNew: false,
      userData: {
        messageId: msg.message_id,
        inPrivate: group.inPrivate,
        messageCount: 0,
        settings: {
          fontSize: 60,
          fontColor: "fff8",
          fontOutline: "",
          font: "",
        },
        isFree: false,
        isPremium: false,
      },
    };
  }

  return next();
};
