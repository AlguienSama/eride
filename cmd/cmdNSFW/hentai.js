const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'hentai',
    alias: [],
    description: 'Hentai',
    usage: 'hentai',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.hentai().then(async img => await imgNsfw(message, img))
    }
};