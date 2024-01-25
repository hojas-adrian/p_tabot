import { InlineQueryResultBuilder } from "../../deps.ts";
import { MyContext } from "../types.ts";
import { check, sendSticker } from "../helpers/utils.ts";
import { channelDump, sticker } from "../helpers/constants.ts";

export default async (ctx: MyContext) => {
  const query = ctx.inlineQuery?.query as string;

  const button = {
    text: "Desbloquear el bot",
    start_parameter: "login",
  };

  const file_0 = await sendSticker(
    ctx,
    query,
    sticker[0],
    +channelDump,
  );

  const file_1 = await sendSticker(
    ctx,
    query,
    sticker[1],
    +channelDump,
  );

  const result = [
    InlineQueryResultBuilder.stickerCached(
      "id-0",
      file_0.sticker.file_id,
    ),
    InlineQueryResultBuilder.stickerCached(
      "id-1",
      file_1.sticker.file_id,
    ),
  ];

  await ctx.answerInlineQuery(
    await check(ctx) ? result : result.slice(0, 1),
    {
      cache_time: 24 * 3600,
      button: await check(ctx) ? undefined : button,
    },
  );
};
