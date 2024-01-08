import { webhookCallback } from "./deps.ts";
import { bot } from "./src/bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

await bot.init();

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
