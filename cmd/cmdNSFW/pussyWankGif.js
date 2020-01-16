const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'pussywank',
    alias: ['pussywankgif'],
    description: 'Hentai de pussy noseque',
    usage: 'pussywank',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.pussyWankGif().then(async img => await imgNsfw(message, img))
    }
};