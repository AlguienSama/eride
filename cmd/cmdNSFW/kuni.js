const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'kuni',
    alias: [],
    description: 'Hentai de kuni ||que le come el coño||',
    usage: 'kuni',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.kuni().then(async img => await imgNsfw(message, img))
    }
};