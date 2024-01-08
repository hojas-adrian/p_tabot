import {
  apiThrottler,
  Bot,
  freeStorage,
  matchFilter,
  session,
} from "../deps.ts";
import { getSessionKey, initial } from "./helpers/session.ts";
import { MyContext, SessionData } from "./types.ts";
import commands from "./composer/commands.ts";
import inPrivate from "./composer/inPrivate.ts";
import firstVisit from "./handlers/handlerFirstVisit.ts";
import handlerGlobalQuery from "./handlers/handlerGlobalQuery.ts";
import messageCount from "./composer/messageCounter.ts";
import { commandsChat, commandsPrivate } from "./helpers/utils.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;
export const bot = new Bot<MyContext>(BOT_TOKEN);

const throttler = apiThrottler();
bot.api.config.use(throttler);

bot.use(session({
  getSessionKey,
  initial,
  //storage: freeStorage<SessionData>(bot.token),
}));

bot.on("inline_query", handlerGlobalQuery);
bot.drop(matchFilter("channel_post"))
  .use(firstVisit, messageCount, commands, inPrivate);

await bot.api.setMyCommands(commandsPrivate, {
  scope: { type: "all_private_chats" },
});
await bot.api.setMyCommands(commandsChat, {
  scope: { type: "all_group_chats" },
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`error al manejar ${ctx.update.update_id}\n ${err}`);
});
