const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const { imgDescEmbed } = require('../../files/embeds.js');

module.exports = {
    name: 'lick',
    alias: ['lamer'],
    description: 'Un lamido',
    usage: 'lick [usuario]',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        
        neko.sfw.lick().then(async img => {
            let desc = `${message.author} ha lamido a ${args.join(" ")}`;
            return message.channel.send(await imgDescEmbed(desc, img.url))
        })
    }
};