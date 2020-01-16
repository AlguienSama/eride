const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'yuri',
    alias: [],
    description: 'Hentai yuri',
    usage: 'yuri',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.yuri().then(async img => await imgNsfw(message, img))
    }
};