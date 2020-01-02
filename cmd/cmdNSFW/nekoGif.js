const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();


module.exports = {
    name: 'nekogif',
    alias: ['nekosgif'],
    description: 'Gif de nekos',
    usage: '``nekogif``',

    run: async (message, args) => {
        return
        neko.nsfw.nekoGif().then(neko => message.channel.send(new Discord.Attachment(neko.url)))
      
    }
};