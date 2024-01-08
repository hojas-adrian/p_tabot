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
  chatId = ctx.chat?.id,
) => {
  const baseUrl = Deno.env.get("IMGIX_URL");
  const img = "20240104-14d9bc8c-d409-4566-9286-32bdafa8a3a6.png";
  const fontSize = "60";
  const fontColor = "fff8";
  const reply = ctx.message?.reply_to_message;

  if (!chatId) {
    return await ctx.replyWithSticker(
      `${baseUrl}/${img}?fm=webp&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtsize%3D${fontSize}%26w%3D600%26h%3D300%26txt%3D${text}%26txt-lead%3D-8%26txt-align%3Dmiddle%2Ccenter%26txtclr%3D${fontColor}&mark-w=1&mark-h=0.5&mark-y=10&mark-fit=max`,
      {
        reply_parameters: {
          message_id: reply?.message_id || 0,
        },
      },
    );
  }

  return await ctx.api.sendSticker(
    chatId,
    `${baseUrl}/${img}?fm=webp&mark=https%3A%2F%2Fassets.imgix.net%2F~text%3Ftxtsize%3D${fontSize}%26w%3D600%26h%3D300%26txt%3D${text}%26txt-lead%3D-8%26txt-align%3Dmiddle%2Ccenter%26txtclr%3D${fontColor}&mark-w=1&mark-h=0.5&mark-y=10&mark-fit=max`,
    {
      reply_parameters: {
        message_id: reply?.message_id || 0,
      },
    },
  );
};
