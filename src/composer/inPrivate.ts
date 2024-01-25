import { Composer } from "../../deps.ts";
import { sticker } from "../helpers/constants.ts";
import { sendSticker } from "../helpers/utils.ts";
import { MyContext } from "../types.ts";

const composer = new Composer<MyContext>();

composer
  .chatType("private")
  .on(
    "::bot_command",
    (ctx: MyContext) =>
      ctx.reply(
        "🐸 Comando desconocido. Consulta la ayuda utilizando el siguiente comando:<pre>/help</pre>",
        {
          parse_mode: "HTML",
        },
      ),
  );

composer
  .chatType("private")
  .on("message:text", async (ctx: MyContext) => {
    await sendSticker(ctx, ctx.message?.text as string, sticker[0]);
  });

export default composer;
