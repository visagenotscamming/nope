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
  execute: () => execute
});
var import_discord = __toModule(require("discord.js"));
var import_config = __toModule(require("../../util/config"));
var import_console = __toModule(require("../../util/console"));
var import_embeds = __toModule(require("../util/embeds"));
const execute = async (client) => {
  var _a;
  (_a = client.user) == null ? void 0 : _a.setActivity("wickbot.com | Shard192", { type: import_discord.ActivityType.Watching });
  const channelToSend = client.channels.cache.get(import_config.config.verify.channelId);
  (await channelToSend.messages.fetch({ limit: 50 })).forEach((message) => message.author.bot ? message.delete() : null);
  const actionRow = new import_discord.ActionRowBuilder().addComponents(new import_discord.ButtonBuilder().setLabel("Verify").setStyle(import_discord.ButtonStyle.Success).setCustomId("verify")).addComponents(new import_discord.ButtonBuilder().setLabel("Help").setStyle(import_discord.ButtonStyle.Secondary).setCustomId("help"));
  await channelToSend.send({
    embeds: [(0, import_embeds.initialiseEmbed)(client)],
    components: [actionRow]
  });
  (0, import_console.logSuccess)("SENT VERIFY MESSAGE");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=ready.js.map
