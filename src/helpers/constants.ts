export const COMMANDS = [
  {
    name: "start",
    description: "inicia el bot",
    isPublic: true,
    inGroups: false,
  },
  {
    name: "help",
    description: "mostrar ayuda",
    isPublic: true,
    inGroups: false,
  },
  {
    name: "send",
    description: "enviar sticker",
    isPublic: true,
    inGroups: true,
  },
  {
    name: "status",
    description: "ver tu status",
    isPublic: true,
    inGroups: false,
  },
  {
    name: "getuserid",
    description: "inicia el bot",
    isPublic: false,
    inGroups: false,
  },
  {
    name: "chetchatid",
    description: "inicia el bot",
    isPublic: false,
    inGroups: false,
  },
  {
    name: "setpremium",
    description: "inicia el bot",
    isPublic: false,
    inGroups: false,
  },
  {
    name: "setfree",
    description: "inicia el bot",
    isPublic: false,
    inGroups: false,
  },
];

export const sticker = [
  {
    image: "20240104-14d9bc8c-d409-4566-9286-32bdafa8a3a6.png",
    fontSize: "60",
    fontColor: "fff8",
    width: "600",
  },
  {
    image: "20240124-14d9bc8c-d409-4566-9286-32bdafa8a3a6.png",
    fontSize: "50",
    fontColor: "000",
    width: "400",
  },
];

export const USERS_TO_FREE = new Set();
export const USERS_TO_PREMIUM = new Set();
export const spamGroup = Deno.env.get("SPAM_GROUP") as string;
export const spamGroupURL = Deno.env.get("SPAM_GROUP_URL") as string;
export const spamChannel = Deno.env.get("SPAM_CHANNEL") as string;
export const spamChannelURL = Deno.env.get("SPAM_CHANNEL_URL") as string;
export const admin = Deno.env.get("ADMIN_1") as string;
export const channelLog = Deno.env.get("CHANNEL_LOG") as string;
export const channelDump = Deno.env.get("CHANNEL_DUMP") as string;
