const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
const db = require('megadb')
let bbdd = new db.crearDB('permisos')

const { imgEmbed, imgSpoiler } = require('../../files/embeds.js');

module.exports = {
    name: 'nekogif',
    alias: ['nekosgif'],
    description: 'Gif de nekos',
    usage: '``nekogif``',

    run: async (message, args) => {

        let img = neko.nsfw.nekoGif().then(neko => message.channel.send(new Discord.Attachment(neko.url)))

        if (bbdd.tiene(`${message.guild.id}.nsfw`)) {
            let perm = await bbdd.obtener(`${message.guild.id}.nsfw`)

            if (perm === "spoiler")
                return message.channel.send(imgSpoiler(img))
        } else
            return message.channel.send(imgEmbed(img))
    }
};