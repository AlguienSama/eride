const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'keta',
    alias: [],
    description: 'Hentai de keta ||nu se que es||',
    usage: 'keta',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.keta().then(async img => await imgNsfw(message, img))
    }
};