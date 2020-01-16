const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'neko',
    alias: ['nekos'],
    description: 'Imagenes de nekos',
    usage: 'neko',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.neko().then(async img => await imgNsfw(message, img))
    }
};