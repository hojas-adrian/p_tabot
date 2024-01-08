import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  await ctx.reply(
    `<blockquote>code is art  @hojas.adrian</blockquote>`,
    {
      parse_mode: "HTML",
      reply_parameters: { message_id: ctx.message?.message_id || 0 },
    },
  );
};
