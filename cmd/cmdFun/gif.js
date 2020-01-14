const Discord = require('discord.js');
var giphy = require('giphy-api')();

const { imgEmbed } = require('../../files/embeds.js');

module.exports = {
    name: 'gif',
    alias: [],
    description: 'Un gif random',
    usage: 'gif <argumentos>',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        
        if (!args) {
            giphy.trending({
                limit: 1,
                rating: 'g',
                fmt: 'json'
            }).then(async img => {
                console.log(img.data.image_url);
                return message.channel.send(await imgEmbed(img.data.image_url))
                
            })
        }

        giphy.random(args.join(" ")).then(async img => {
            console.log(img.data.image_url).catch(err => message.channel.send(err));
            return message.channel.send(await imgEmbed(img.data.image_url))
            
        })

        // neko.sfw.lick().then(async img => {
        //     let desc = `${message.author} ha lamido a ${args.join(" ")}`;
        //     return message.channel.send(await imgDescEmbed(desc, img.url))
        // })
    }
};