import { MyContext } from "../types.ts";
import { admin, channelLog, USERS_TO_FREE } from "../helpers/constants.ts";
import { NextFunction } from "../../deps.ts";

export default async (ctx: MyContext, next: NextFunction) => {
  const user = ctx.from?.id;

  if (user !== +admin) {
    next();
  }

  if (!ctx.match) {
    return ctx.reply("añade un id");
  }

  const time = new Date();
  const userToFree = +ctx.match;

  USERS_TO_FREE.add(userToFree);

  await ctx.api.sendMessage(
    channelLog,
    `👤 <a href="tg://user?id=${ctx.match}">${ctx.match}</a>\n└─ #pendingFree #a${ctx.match}\n<code>${time.getFullYear()}/${
      time.getMonth() + 1
    }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>`,
    {
      parse_mode: "HTML",
    },
  );

  return await ctx.reply(
    `👤 <a href="tg://user?id=${ctx.match}">${ctx.match}</a>\n└─ #pendingFree #a${ctx.match}\n<code>${time.getFullYear()}/${
      time.getMonth() + 1
    }/${time.getDate()}-${time.getHours()}:${time.getMinutes()}</code>\n\nConsulta la lista aqui /list`,
  );
};
