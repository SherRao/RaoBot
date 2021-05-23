const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

/**
 *
 * A command to remove messages from a text channel.
 *
 * @author Nausher Rao
 *
 */
module.exports = {
    data: {
        name: "ping",
        description: "Return an estimate of the latency between the bot and the Discord API.",
        default_permission: true,
        type: 1,
    },

    execute: async (interaction) => {
        const channelID = interaction.channel_id;
        const channel = discord.channels.cache.get(channelID);

        const messageID = interaction.id;
        const message = channel.messages.cache.get(messageID);

        // let serverLatency = Date.now() - message.createdTimestamp;
        let apiLatency = Math.round(discord.ws.ping);

        util.sendMessage(`API Latency: ${apiLatency} ms.`, interaction);
    },
};
