const Discord = require('discord.js');
const getEmojis = require('discordjs-getemojis');

const {fail} = require('../../files/embeds.js');

module.exports = {
    name: 'see-emoji',
    alias: ['se'],
    description: 'Ver un emoticono',
    usage: 'see-emoji < emoji >',
    permission: 'none',
    type: 'misc',

    run: async (message, args) => {
        const emojis = getEmojis(message);
        console.log(emojis);
    }
};