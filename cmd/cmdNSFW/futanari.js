const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();


module.exports = {
    name: 'futanari',
    alias: ['futa'],
    description: 'Futanari',
    usage: '``futanari``',

    run: async (message, args) => {
        return
        neko.nsfw.futanari().then(neko => message.channel.send(new Discord.Attachment(neko.url)))
      
    }
};