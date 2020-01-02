const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

var {error, deny} = require('../../logs.js');

module.exports = {
    name: 'nekogif',
    alias: ['nekosgif'],
    description: 'Gif de nekos',
    usage: '``nekogif``',

    run: async (message, args) => {

        neko.nsfw.nekoGif().then(neko => message.channel.send(new Discord.Attachment(neko.url)))
      
    }
};