var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  getChannelName: () => getChannelName,
  getGuildName: () => getGuildName
});
const getGuildName = (client, guildId) => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild)
    return "Unknown";
  return guild.name;
};
const getChannelName = (client, channelId) => {
  const channel = client.channels.cache.get(channelId);
  if (!channel)
    return "Unknown";
  return channel.name;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getChannelName,
  getGuildName
});
//# sourceMappingURL=other.js.map
