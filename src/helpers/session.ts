import { Context } from "../../deps.ts";
import { SessionData } from "../types.ts";

export function initial(): SessionData {
  return { isNew: true };
}

export function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}
