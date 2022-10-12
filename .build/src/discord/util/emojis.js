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
  default: () => emojis_default
});
var import_config = __toModule(require("../../util/config"));
var emojis_default = (client) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const alarm = (_a = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _a.emojis.cache.find((emoji) => emoji.name === "alarm");
  const cancel = (_b = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _b.emojis.cache.find((emoji) => emoji.name === "cancel");
  const loading = (_c = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _c.emojis.cache.find((emoji) => emoji.name === "loading");
  const mail = (_d = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _d.emojis.cache.find((emoji) => emoji.name === "mail");
  const right = (_e = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _e.emojis.cache.find((emoji) => emoji.name === "right");
  const space = (_f = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _f.emojis.cache.find((emoji) => emoji.name === "space");
  const success = (_g = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _g.emojis.cache.find((emoji) => emoji.name === "success");
  const tick = (_h = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _h.emojis.cache.find((emoji) => emoji.name === "tick");
  const verification = (_i = client.guilds.cache.get(import_config.config.emojiGuildId)) == null ? void 0 : _i.emojis.cache.find((emoji) => emoji.name === "verification");
  return {
    alarm,
    cancel,
    loading,
    mail,
    right,
    space,
    success,
    tick,
    verification
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=emojis.js.map
