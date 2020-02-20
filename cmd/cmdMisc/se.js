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
        // /<[_a-zA-Z0-9]*:[_a-zA-Z0-9]*>/gi
        // /<a:[_a-zA-Z0-9]*:[_a-zA-Z0-9]*>/
        if (message.content.match(/<a:[_a-zA-Z0-9]*:[_a-zA-Z0-9]*>/gi))
            console.log(true);
        else
            console.log(false);
        const emojis = getEmojis(message);
        console.log(emojis);
    }
};