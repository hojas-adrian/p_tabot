import { MyContext } from "../types.ts";
import { COMMANDS, spamChannel } from "./constants.ts";

export const check = async (ctx: MyContext) => {
  const isMember = await ctx.api.getChatMember(
    spamChannel,
    ctx.from?.id || NaN,
  );

  return ((isMember.status === "member" || isMember.status === "creator") &&
    (ctx.session.isNew === false && ctx.session.userData.messageCount >= 5)) ||
    (ctx.session.isNew === false && ctx.session.userData.isFree);
};

export const commandsChat = COMMANDS.filter((command) => {
  return command.inGroups === true;
}).map((command) => ({
  command: command.name,
  description: command.description,
}));

export const commandsPrivate = COMMANDS.filter((command) =>
  command.isPublic === true
).map((command) => ({
  command: command.name,
  description: command.description,
}));

export const sendSticker = async (
  ctx: MyContext,
  text: string,
  stk: { image: string; fontSize: string; fontColor: string; width: string },
  chatId = ctx.chat?.id,
) => {
  const baseUrl = Deno.env.get("IMGIX_URL");
  const img = stk.image;
  const fontSize = stk.fontSize;
  const width = stk.width;
  const fontColor = stk.fontColor;
  const reply = ctx.message?.reply_to_message;

  if (!chatId) {
    return await ctx.replyWithSticker(
      `${baseUrl}/${img}?fm=webp&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtsize%3D${fontSize}%26w%3D${width}%26h%3D300%26txt%3D${text}%26txt-lead%3D-8%26txt-align%3Dmiddle%2Ccenter%26txtclr%3D${fontColor}&mark-w=1&mark-h=0.5&mark-y=10&mark-x=10&mark-fit=max`,
      {
        reply_parameters: {
          message_id: reply?.message_id || 0,
        },
      },
    );
  }

  return await ctx.api.sendSticker(
    chatId,
    `${baseUrl}/${img}?fm=webp&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtsize%3D${fontSize}%26w%3D${width}%26h%3D300%26txt%3D${text}%26txt-lead%3D-8%26txt-align%3Dmiddle%2Ccenter%26txtclr%3D${fontColor}&mark-w=1&mark-h=0.5&mark-y=10&mark-x=10&mark-fit=max`,
    {
      reply_parameters: {
        message_id: reply?.message_id || 0,
      },
    },
  );
};
