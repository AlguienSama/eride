const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
const db = require('megadb')
let bbdd = new db.crearDB('permisos')

const { imgEmbed, imgSpoiler } = require('../../files/embeds.js');

module.exports = {
    name: 'pat',
    alias: [],
    description: 'Un pat',
    usage: 'pat [usuario]',
    permission:'none',
    type:'fun',

    run: async (message, args) => {
        
        neko.nsfw.pat().then(async img => {
            let desc = `${message.author} a dado un pat a ${message.user}`
        })
    }
};