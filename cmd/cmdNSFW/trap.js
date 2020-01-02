const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

var {error, deny} = require('../../logs.js');

module.exports = {
    name: 'trap',
    alias: ['traps'],
    description: 'Hentai de trapos',
    usage: '``trap``',

    run: async (message, args) => {
        return
        neko.nsfw.trap().then(neko => message.channel.send(new Discord.Attachment(neko.url)))
      
    }
};