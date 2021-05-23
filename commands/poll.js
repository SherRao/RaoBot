const util = require("../util");
const main = require("../index");
const discord = main.discord;
const logger = main.logger;

const questionEmbed = require("../embeds/question");

/**
 *
 * A command to start and retreieve data for polls.
 *
 * @author Nausher Rao
 *
 */
module.exports = {
    data: {
        name: "poll",
        description: "Start and collect data about a simple poll.",
        type: 2,
        default_permission: true,
        options: [
            {
                name: "start",
                description: "Starts a new poll using the interactive editor.",
                type: 1,
            },

            {
                name: "data",
                description: "Collect data for the last made poll - can also specify a message ID of a poll.",
                type: 1,
                options: [
                    {
                        name: "message",
                        description: "The message ID of the poll.",
                        type: 3,
                        required: true,
                    },
                ],
            },
        ],
    },

    // Code executed when this slash command is used by a valid user.
    execute: async (interaction) => {
        logger.info("Someone used the poll command!");

        let subcommand = interaction.data.options[0].name.toLowerCase();
        if (subcommand == "start") {
            startSubCommand(interaction);
        } else if (subcommand == "data") {
            dataSubCommand(interaction);
        }
    },
};

async function startSubCommand(interaction) {
    const serverID = interaction.guild_id;
    const server = discord.guilds.cache.get(serverID);

    const channelID = interaction.channel_id;
    const channel = discord.channels.cache.get(channelID);

    const authorID = interaction.member.user.id;
    const author = await server.members.fetch(authorID);
    const messageFilter = (msg) => {
        return msg.author.id === author.user.id;
    };
    const reactionFilter = (reaction, user) => {
        return user.id === author.user.id;
    };

    util.sendMessage("What question do you want to ask?", interaction);
    let questionCollector = await channel.awaitMessages(messageFilter, { max: 1 });
    let questionResponse = questionCollector.first();
    let question = questionResponse.content;

    await questionResponse.react("✅");
    let answerTypeMessage = await questionResponse.lineReply(
        "Great! What type of poll do you want to ask?\n\n1. Custom\n2. Yes/No\n\n***React with the number of the option!***"
    );
    await answerTypeMessage.react("1️⃣");
    await answerTypeMessage.react("2️⃣");

    let answerTypesCollector = await answerTypeMessage.awaitReactions(messageFilter);
    let answerTypesResponse = answerTypesCollector.first();
    let answerTypes = answerTypesResponse.content;
    console.log(answerTypes);

    if (answerTypes === 1) {
        answerTypesResponse.lineReply("Alright! Give me all the options, each seperated by a new line!");
    } else {
        answerTypesResponse.lineReply("ok i do poll now");
    }
}

async function dataSubCommand(interaction) {}
