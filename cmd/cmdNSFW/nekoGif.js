const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
const db = require('megadb')
let bbdd = new db.crearDB('permisos')

const { imgEmbed, imgSpoiler } = require('../../files/embeds.js');

module.exports = {
    name: 'nekogif',
    alias: ['nekosgif', 'smug'],
    description: 'Gif de nekos',
    usage: '``nekogif``',

    run: async (message, args) => {

        neko.sfw.smug().then(async img => {

            console.log("THIS => "+img.url)
            if (bbdd.tiene(`${message.guild.id}.nsfw`)) {
                let perm = await bbdd.obtener(`${message.guild.id}.nsfw`)
    
                if (perm === "spoiler")
                    return message.channel.send(imgSpoiler(img.url))
            } else {
                return message.channel.send(imgEmbed(img.url))
            }
        })
    }
};