import { InlineQueryResultBuilder } from "../../deps.ts";
import { MyContext } from "../types.ts";
import { check, sendSticker } from "../helpers/utils.ts";
import { channelDump } from "../helpers/constants.ts";

export default async (ctx: MyContext) => {
  const query = ctx.inlineQuery?.query as string;

  const button = {
    text: "Desbloquear el bot",
    start_parameter: "login",
  };

  const stk = await sendSticker(
    ctx,
    query,
    +channelDump,
  );

  const result = InlineQueryResultBuilder.stickerCached(
    "id-0",
    stk.sticker.file_id,
  );

  await ctx.answerInlineQuery(
    await check(ctx) ? [result] : [],
    {
      cache_time: 24 * 3600,
      button: await check(ctx) ? undefined : button,
    },
  );
};
