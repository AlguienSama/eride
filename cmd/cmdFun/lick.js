const Discord = require('discord.js');

const { imgDescEmbed } = require('../../files/embeds.js');

module.exports = {
    name: 'lick',
    alias: ['lamer'],
    description: 'Un lamido',
    usage: 'lick [usuario]',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        
        message.Tenor.Search.Random("anime lick", "1").then(Results => {
            console.log(Results)
            Results.forEach(async Post => {
                console.log(Post.url)
                let desc = `${message.author} ha lamido a ${args.join(" ")}`;
                return message.channel.send(await imgDescEmbed(desc, Post.itemurl))
            });
      })

    }
};