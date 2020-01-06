const Discord = require('discord.js');
const client = require('nekos.life');
var giphy = require('giphy-api')();

const { imgDescEmbed } = require('../../files/embeds.js');

module.exports = {
    name: 'lick',
    alias: ['lamer'],
    description: 'Un lamido',
    usage: 'lick [usuario]',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        

        giphy.random('anime lick').then(async img => {
            console.log(img.data.image_url);
            let desc = `${message.author} ha lamido a ${args.join(" ")}`;
            return message.channel.send(await imgDescEmbed(desc, img.data.image_url))
            
        })

        // neko.sfw.lick().then(async img => {
        //     let desc = `${message.author} ha lamido a ${args.join(" ")}`;
        //     return message.channel.send(await imgDescEmbed(desc, img.url))
        // })
    }
};