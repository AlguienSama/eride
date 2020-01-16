const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'nekogif',
    alias: ['nekosgif'],
    description: 'Gif de nekos',
    usage: 'nekogif',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.nekoGif().then(async img => await imgNsfw(message, img))
    }
};