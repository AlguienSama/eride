const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'classic',
    alias: [],
    description: 'Hentai classic',
    usage: 'classic',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.classic().then(async img => await imgNsfw(message, img))
    }
};