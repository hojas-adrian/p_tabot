import { Context, SessionFlavor } from "./../deps.ts";

export type SessionData = {
  isNew: true;
} | {
  isNew: false;

  userData: {
    messageId: number;
    inPrivate: boolean;
    messageCount: number;
    isFree: boolean;
    isPremium: false;

    settings: {
      font: string;
      fontColor: string;
      fontOutline: string;
      fontSize: number;
    };
  };
} | {
  isNew: false;

  userData: {
    messageId: number;
    inPrivate: boolean;
    messageCount: number;
    isFree: boolean;
    isPremium: true;

    premiumData: {
      plan: string;
      premiumStickers: {
        command: string;
        file: string;
      }[];
    };

    settings: {
      font: string;
      fontColor: string;
      fontOutline: string;
      fontSize: number;
    };
  };
};

export type MyContext = Context & SessionFlavor<SessionData>;
