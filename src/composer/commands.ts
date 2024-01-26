import { Composer } from "../../deps.ts";
import { MyContext } from "../types.ts";
import handlerSend from "../handlers/handlerSend.ts";
import handlerGetUserId from "../handlers/handlerGetUserId.ts";
import handlerGetChatId from "../handlers/handlerGetChatId.ts";
import handlerStart from "../handlers/handlerStart.ts";
import handlerSetFreeUser from "../handlers/handlerSetFreeUser.ts";
import handlerSetPremiumUser from "../handlers/handlerSetPremiumUser.ts";
import handlerFree from "../handlers/handlerChangeFree.ts";
import handlerUpgrade from "../handlers/handlerChangeUpgrade.ts";
import handlerStatus from "../handlers/handlerStatus.ts";
import handlerHelp from "../handlers/handlerHelp.ts";
import handlerAuthor from "../handlers/handlerAuthor.ts";
import handlerVersion from "../handlers/handlerVersion.ts";

const composer = new Composer<MyContext>();

composer.command("version", handlerVersion);
composer.command("setFree", handlerSetFreeUser);
composer.command("setPremium", handlerSetPremiumUser);

composer.command("p_free", handlerFree);
composer.command("p_upgrade", handlerUpgrade);

composer.command("send", handlerSend);
composer.command("start", handlerStart);
composer.command("help", handlerHelp);
composer.command(
  "settings",
  async (ctx) => await ctx.reply("⚠️ estamos trabajando"),
);
composer.command("getuserid", handlerGetUserId);
composer.command("getchatid", handlerGetChatId);
composer.command("status", handlerStatus);

composer.command("author", handlerAuthor);

export default composer;
