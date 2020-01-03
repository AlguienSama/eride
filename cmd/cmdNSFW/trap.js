const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();


module.exports = {
    name: 'trap',
    alias: ['traps'],
    description: 'Hentai de trapos',
    usage: '``trap``',

    run: async (message, args) => {
        
        neko.nsfw.trap().then(async img => {

            if (bbdd.tiene(`${message.guild.id}.nsfw`)) {
                let perm = await bbdd.obtener(`${message.guild.id}.nsfw`)
    
                if (perm === "spoiler")
                    return message.channel.send( await imgSpoiler(img.url))
            } else {
                return message.channel.send( await imgEmbed(img.url))
            }
        })
    }
};