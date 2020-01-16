const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'pussy',
    alias: ['pussys'],
    description: 'Hentai de pussys',
    usage: 'pussy',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.pussy().then(async img => await imgNsfw(message, img))
    }
};