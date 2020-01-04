const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const { imgDescEmbed } = require('../../files/embeds.js');

module.exports = {
    name: 'pat',
    alias: [],
    description: 'Un pat',
    usage: 'pat [usuario]',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        
        neko.sfw.pat().then(async img => {
            let desc = `${message.author} a dado un pat a ${args.join(" ")}`;
            return message.channel.send(await imgDescEmbed(desc, img.url))
        })
    }
};