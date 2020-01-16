const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'holo',
    alias: [],
    description: 'Hentai de holo ||una zorra que se llama Holo||',
    usage: 'holo',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.holo().then(async img => await imgNsfw(message, img))
    }
};