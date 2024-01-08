import { InlineKeyboard } from "../../deps.ts";
import { spamChannelURL, spamGroupURL } from "../helpers/constants.ts";

export const links = new InlineKeyboard()
  .url("Ir al grupo", spamGroupURL).row()
  .url("Ir al canal", spamChannelURL);

export const search = new InlineKeyboard()
  .switchInlineChosen("crear sticker", {
    allow_group_chats: true,
    allow_user_chats: true,
  });
