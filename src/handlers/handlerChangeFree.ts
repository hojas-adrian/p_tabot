import { admin, channelLog, USERS_TO_FREE } from "../helpers/constants.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  if (USERS_TO_FREE.has(ctx.from?.id) && ctx.session.isNew === false) {
    const time = new Date();

    const user = {
      name: `${ctx.from?.first_name} ${ctx.from?.last_name || ""}`,
      userName: ctx.from?.username,
      userId: ctx.from?.id,
    };

    ctx.session.userData.isFree = true;
    USERS_TO_FREE.delete(user.userId);

    await ctx.api.sendMessage(
      +admin,
      `👤 ${user.name}\n├─ <a href="t.me/${user.userName}">@${user.userName}</a>\n├─ <a href="tg://user?id=${user.userId}">${user.userId}</a>\n└─ #free #a${user.userId}\n<code>${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
      {
        parse_mode: "HTML",
      },
    );

    await ctx.api.sendMessage(
      +channelLog,
      `👤 ${user.name}\n├─ <a href="t.me/${user.userName}">@${user.userName}</a>\n├─ <a href="tg://user?id=${user.userId}">${user.userId}</a>\n└─ #free #a${user.userId}\n<code>${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
      {
        parse_mode: "HTML",
        reply_parameters: {
          message_id: ctx.session.userData.messageId,
        },
      },
    );

    return await ctx.reply(
      "🐸 Ahora eres libre. Compruébalo con el siguiente comando:<pre>/status</pre>",
    );
  }

  return await ctx.reply("🐸 No puedes hacerte libre");
};
