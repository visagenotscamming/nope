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
  failedToDMEmbed: () => failedToDMEmbed,
  failedVerificationEmbed: () => failedVerificationEmbed,
  failedVerificationEmbedReason: () => failedVerificationEmbedReason,
  initialiseEmbed: () => initialiseEmbed,
  startVerificationEmbed: () => startVerificationEmbed,
  successDMEmbed: () => successDMEmbed,
  successVerificationEmbed: () => successVerificationEmbed,
  verificationCodeEmbed: () => verificationCodeEmbed
});
var import_discord = __toModule(require("discord.js"));
var import_other = __toModule(require("./other"));
var import_config = __toModule(require("../../util/config"));
var import_emojis2 = __toModule(require("./emojis"));
const initialiseEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const guildName = (0, import_other.getGuildName)(client, import_config.config.verify.guildId);
  const embed = new import_discord.EmbedBuilder().setColor("#2f3136").setTitle(`${allEmojis.verification} Verification Required!`).setDescription(`${allEmojis.space}${allEmojis.success} **To access \`${guildName}\`, you need to pass the verification first.**
${allEmojis.space}${allEmojis.space}${allEmojis.right} Press on the **Verify** button below.`);
  return embed;
};
const successDMEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const embed = new import_discord.EmbedBuilder().setColor("#f3b822").setDescription(`${allEmojis.loading} Starting verification... Check your dms!`);
  return embed;
};
const failedToDMEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const embed = new import_discord.EmbedBuilder().setColor("#fc2323").setDescription(`${allEmojis.cancel} **I wasn't able to DM you.. Open your DMs and try to reverify.**`);
  return embed;
};
const startVerificationEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const embed = new import_discord.EmbedBuilder().setColor("#f3b822").setDescription(`${allEmojis.loading} **Preparing verification..**`);
  return embed;
};
const verificationCodeEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const embed = new import_discord.EmbedBuilder().setColor("#2f3136").addFields([
    { name: `${allEmojis.verification} **Hello! Are you human? Let's find out!**`, value: `\`Please scan the QR Code below using the discord mobile app to verify!\`` },
    { name: "Additional Notes:", value: `${allEmojis.mail} Do not share this QR Code with anybody! 
${allEmojis.tick} This code grants access to this server once.
 ${allEmojis.alarm} You will be notified when you have been verified.` }
  ]).setFooter({
    text: "Verification Period: 2 minutes"
  });
  return embed;
};
const failedVerificationEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const guildName = (0, import_other.getGuildName)(client, import_config.config.verify.guildId);
  const channelName = (0, import_other.getChannelName)(client, import_config.config.verify.channelId);
  const embed = new import_discord.EmbedBuilder().setColor("#ff2222").setTitle(`You have failed verification!`).setDescription(`${allEmojis.cancel} You have unfortunately failed to pass the verification in \`${guildName}\`.
        ${allEmojis.space} **Reason:** \`Failed to verify! [Timeout]\`
        ${allEmojis.space}${allEmojis.right} You can go back to #${channelName} to start a new verification process by clicking on the Verify button again.`);
  return embed;
};
const failedVerificationEmbedReason = (client, reason) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const guildName = (0, import_other.getGuildName)(client, import_config.config.verify.guildId);
  const channelName = (0, import_other.getChannelName)(client, import_config.config.verify.channelId);
  const embed = new import_discord.EmbedBuilder().setColor("#ff2222").setTitle(`You have failed verification!`).setDescription(`${allEmojis.cancel} You have unfortunately failed to pass the verification in \`${guildName}\`.
        ${allEmojis.space} **Reason:** \`Failed to verify! [${reason}]\`
        ${allEmojis.space}${allEmojis.right} You can go back to #${channelName} to start a new verification process by clicking on the Verify button again.`);
  return embed;
};
const successVerificationEmbed = (client) => {
  const allEmojis = (0, import_emojis2.default)(client);
  const guildName = (0, import_other.getGuildName)(client, import_config.config.verify.guildId);
  const embed = new import_discord.EmbedBuilder().setColor("#22ff40").setTitle(`You have been verified!`).setDescription(`${allEmojis.success} You passed the verification successfully. You can now access \`${guildName}\`!`);
  return embed;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  failedToDMEmbed,
  failedVerificationEmbed,
  failedVerificationEmbedReason,
  initialiseEmbed,
  startVerificationEmbed,
  successDMEmbed,
  successVerificationEmbed,
  verificationCodeEmbed
});
//# sourceMappingURL=embeds.js.map
