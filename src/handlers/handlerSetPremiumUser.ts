import { NextFunction } from "../../deps.ts";
import { admin } from "../helpers/constants.ts";
import { MyContext } from "../types.ts";

export default (ctx: MyContext, next: NextFunction) => {
  const user = ctx.from?.id;

  if (user !== +admin) {
    next();
  }

  if (!ctx.match) {
    return;
  }
};
