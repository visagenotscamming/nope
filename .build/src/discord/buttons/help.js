var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  execute: () => execute
});
const execute = async (client, interaction) => new Promise(async (resolve, reject) => {
  const reply = await interaction.reply({
    content: `https://wickbot.com/`,
    ephemeral: true
  });
  resolve(reply);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  execute
});
//# sourceMappingURL=help.js.map
