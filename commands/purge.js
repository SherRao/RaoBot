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
        name: "purge",
        description: "Purge all, or a certain amount, of messages from the channel this command was executed in.",
        default_permission: true,
        type: 1,
        options: [
            {
                name: "amount",
                description: "The amount of messages to purge",
                type: 4,
                required: false,
            },
        ],
    },

    // Code executed when this slash command is used by a valid user.
    execute: async (interaction) => {
        const channelID = interaction.channel_id;
        const channel = discord.channels.cache.get(channelID);

        let amount = interaction.data.options ? interaction.data.options[0].value : 100;
        let deletedMessages = await channel.bulkDelete(amount, { filterOld: true });
        let deleted = deletedMessages.size;
        util.sendMessage(`Removed ${deleted} messages!`, interaction);
    },
};
