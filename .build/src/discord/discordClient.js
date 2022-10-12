var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => discordClient_default
});
var import_discord = __toModule(require("discord.js"));
var import_config = __toModule(require("../util/config"));
var import_console = __toModule(require("../util/console"));
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
const initialise = async () => {
  const client = new import_discord.Client({
    intents: 131071,
    partials: [import_discord.Partials.Channel, import_discord.Partials.GuildMember, import_discord.Partials.GuildScheduledEvent, import_discord.Partials.Message, import_discord.Partials.Reaction, import_discord.Partials.ThreadMember, import_discord.Partials.User],
    allowedMentions: { parse: ["users", "roles", "everyone"] }
  });
  client.login(import_config.config.token);
  for (const file of (0, import_fs.readdirSync)(import_path.default.join(__dirname, "./events"))) {
    if (!file.endsWith(".ts"))
      continue;
    const event = require(import_path.default.join(__dirname, `./events/${file}`));
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => event.execute(client, ...args));
    (0, import_console.logInformation)(`${eventName.toUpperCase()} EVENT LOADED `);
  }
  (0, import_console.logInformation)("DISCORD BOT LOADED");
};
var discordClient_default = initialise;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=discordClient.js.map
