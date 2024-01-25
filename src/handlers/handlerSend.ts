import { sticker } from "../helpers/constants.ts";
import { sendSticker } from "../helpers/utils.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  const text = ctx.match as string;
  await sendSticker(ctx, text, sticker[0]);
};
