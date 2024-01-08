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

export const USERS_TO_FREE = new Set();
export const USERS_TO_PREMIUM = new Set();
export const spamGroup = Deno.env.get("SPAM_GROUP") as string;
export const spamGroupURL = Deno.env.get("SPAM_GROUP_URL") as string;
export const spamChannel = Deno.env.get("SPAM_CHANNEL") as string;
export const spamChannelURL = Deno.env.get("SPAM_CHANNEL_URL") as string;
export const admin = Deno.env.get("ADMIN_1") as string;
export const channelLog = Deno.env.get("CHANNEL_LOG") as string;
export const channelDump = Deno.env.get("CHANNEL_DUMP") as string;
