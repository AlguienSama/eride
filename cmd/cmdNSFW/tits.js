const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'tits',
    alias: ['small-oppais'],
    description: 'Hentai de oppais pequeños',
    usage: 'tits',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.tits().then(async img => await imgNsfw(message, img))
    }
};