/**
 * 
 * File that contains an embed to use within different places
 * in the code. 
 * 
 * Reference -> https://discordjs.guide/popular-topics/embeds.html#embed-preview
 * 
 * @author Nausher Rao
 * 
 */
module.exports = {

    exampleEmbed: {
        color: 0x0099ff,
        title: 'RaoBot: Poll Question',
        // url: 'https://discord.js.org',

        // author: {
        //     name: 'Some name',
        //     icon_url: 'https://i.imgur.com/wSTFkRM.png',
        //     url: 'https://discord.js.org',
        // },

        description: 'What question do you want to ask in the poll?',

        thumbnail: { url: 'https://i.imgur.com/wSTFkRM.png' },

        image: { url: 'https://i.imgur.com/wSTFkRM.png' },

        timestamp: "This is the timestamp",
        
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        }
    }

}