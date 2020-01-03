const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
const db = require('megadb')
let bbdd = new db.crearDB('permisos')

const { imgEmbed, imgSpoiler } = require('../../files/embeds.js');

module.exports = {
    name: 'erokitsune',
    alias: ['erokitsunes'],
    description: 'Imagenes de ero kitsunes',
    usage: '``erokitsune``',

    run: async (message, args) => {

        neko.nsfw.eroKitsune().then(async img => {

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