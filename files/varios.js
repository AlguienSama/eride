const Discord = require('discord.js');
const db = require('megadb');
let bbdd = new db.crearDB('permisos');

const {imgEmbed, imgSpoiler} = require('./embeds.js');

module.exports = {

    imgNsfw: async (message, img) => {
        if (bbdd.tiene(`${message.guild.id}.nsfw`)) {
            let perm = await bbdd.obtener(`${message.guild.id}.nsfw`);

            if (perm === "spoiler")
                return message.channel.send(await imgSpoiler(img.url))
        } else {
            return message.channel.send(await imgEmbed(img.url))
        }
    }

};