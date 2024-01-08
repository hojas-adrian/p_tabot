import { links } from "../composer/keyboards.ts";
import {
  spamChannel,
  spamChannelURL,
  spamGroupURL,
} from "../helpers/constants.ts";
import { MyContext } from "../types.ts";

export default async (ctx: MyContext) => {
  const isMember = await ctx.api.getChatMember(
    spamChannel,
    ctx.from?.id || NaN,
  );

  const messageCount = ctx.session.isNew == false
    ? ctx.session.userData.messageCount
    : 0;

  ctx.reply(
    `Este bot personaliza los stickers con el texto que quieras. Estos son los comandos disponibles:\n\n<blockquote>\n/send Devuelve el sticker con el texto personalizado\n/settings Configura el estilo del texto ⚠️\n/status Muestra tu status en el bot\n/help Muestra la ayuda</blockquote>\n\nPara usarlo en modo inline, solo escribe el nombre del bot seguido del texto con el que quieras que se envíe. <i>Para activar este modo debes:</i>\n\n<blockquote>${
      isMember.status === "member" || isMember.status === "creator"
        ? "✅"
        : "❌"
    } Unirte al canal:\n${spamChannelURL}\n${
      messageCount >= 5 ? "✅" : "❌"
    } Enviar <b>${
      (5 - messageCount < 0) ? "0" : 5 - messageCount
    }/5</b> mensajes en este grupo: ${spamGroupURL}</blockquote>\n\nSi quieres agregar un sticker al bot o si quieres uno personalizado que solo tú puedas usar, pídelo en el grupo.\n\n<blockquote>Si deseas utilizar el bot sin unirte al canal o de escribir en el grupo, o si quieres realizar algún pedido, puedes contactar a @hojas_adrian</blockquote>`,
    {
      parse_mode: "HTML",
      reply_markup: links,
      link_preview_options: {
        is_disabled: true,
      },
      reply_parameters: {
        message_id: ctx.message?.message_id || 0,
      },
    },
  );
};
