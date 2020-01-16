const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'pussyart',
    alias: ['pussysart'],
    description: 'Hentai de arte pussys',
    usage: 'pussyart',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.pussyArt().then(async img => await imgNsfw(message, img))
    }
};