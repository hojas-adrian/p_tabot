import { Bot } from "../deps.ts";

import { MyContext } from "./helpers/context.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN") as string;
export const bot = new Bot<MyContext>(BOT_TOKEN);
