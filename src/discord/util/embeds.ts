import { EmbedBuilder, Embed, Client } from "discord.js";
import { IEmojis } from "../../types/emojis";
import { getChannelName, getGuildName } from "./other";
import { config } from "../../util/config";
import emojis from "./emojis";

export const initialiseEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const guildName = getGuildName(client, config.verify.guildId);
    const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle(`${allEmojis.verification} Verification Required!`)
        .setDescription(`${allEmojis.space}${allEmojis.success} **To access \`${guildName}\`, you need to pass the verification first.**\n${allEmojis.space}${allEmojis.space}${allEmojis.right} Press on the **Verify** button below.`);
    
    return embed;
}

export const successDMEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const embed = new EmbedBuilder()
        .setColor("#f3b822")
        .setDescription(`${allEmojis.loading} Starting verification... Check your dms!`);
    
    return embed;
}

export const failedToDMEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const embed = new EmbedBuilder()
        .setColor("#fc2323")
        .setDescription(`${allEmojis.cancel} **I wasn't able to DM you.. Open your DMs and try to reverify.**`);
    
    return embed;
}

export const startVerificationEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const embed = new EmbedBuilder()
        .setColor("#f3b822")
        .setDescription(`${allEmojis.loading} **Preparing verification..**`);
    
    return embed;
}

export const verificationCodeEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .addFields([
            { name: `${allEmojis.verification} **Hello! Are you human? Let's find out!**`, value: `\`Please scan the QR Code below using the discord mobile app to verify!\`` },
            { name: 'Additional Notes:', value: `${allEmojis.mail} Do not share this QR Code with anybody! \n${allEmojis.tick} This code grants access to this server once.\n ${allEmojis.alarm} You will be notified when you have been verified.` }
        ])
        .setFooter({
            text: 'Verification Period: 2 minutes',
        })
    
    return embed;
}

export const failedVerificationEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const guildName = getGuildName(client, config.verify.guildId);
    const channelName = getChannelName(client, config.verify.channelId);
    const embed = new EmbedBuilder()
        .setColor("#ff2222")
        .setTitle(`You have failed verification!`)
        .setDescription(`${allEmojis.cancel} You have unfortunately failed to pass the verification in \`${guildName}\`.
        ${allEmojis.space} **Reason:** \`Failed to verify! [Timeout]\`
        ${allEmojis.space}${allEmojis.right} You can go back to #${channelName} to start a new verification process by clicking on the Verify button again.`)
    
    return embed;
}

export const failedVerificationEmbedReason = (client: Client, reason: string) => {
    const allEmojis: IEmojis = emojis(client);
    const guildName = getGuildName(client, config.verify.guildId);
    const channelName = getChannelName(client, config.verify.channelId);
    const embed = new EmbedBuilder()
        .setColor("#ff2222")
        .setTitle(`You have failed verification!`)
        .setDescription(`${allEmojis.cancel} You have unfortunately failed to pass the verification in \`${guildName}\`.
        ${allEmojis.space} **Reason:** \`Failed to verify! [${reason}]\`
        ${allEmojis.space}${allEmojis.right} You can go back to #${channelName} to start a new verification process by clicking on the Verify button again.`)
    
    return embed;
}

export const successVerificationEmbed = (client: Client) => {
    const allEmojis: IEmojis = emojis(client);
    const guildName = getGuildName(client, config.verify.guildId);
    const embed = new EmbedBuilder()
    .setColor("#22ff40")
    .setTitle(`You have been verified!`)
    .setDescription(`${allEmojis.success} You passed the verification successfully. You can now access \`${guildName}\`!`);
    
    return embed;
}