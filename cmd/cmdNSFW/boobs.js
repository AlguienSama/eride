const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'boobs',
    alias: ['oppais', 'oppai'],
    description: 'Hentai de oppais',
    usage: 'boobs',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.boobs().then(async img => await imgNsfw(message, img))
    }
};