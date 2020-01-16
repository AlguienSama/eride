const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'anal',
    alias: [],
    description: 'Hentai anal',
    usage: 'anal',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.anal().then(async img => await imgNsfw(message, img))
    }
};