const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");


module.exports = {
    name: 'feet',
    alias: ['patas'],
    description: 'Hentai de patas',
    usage: 'feet',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.feetGif().then(async img => await imgNsfw(message, img))
    }
};