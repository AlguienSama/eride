const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'avatar',
    alias: [],
    description: 'Avatares de hentai',
    usage: 'avatar',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.avatar().then(async img => await imgNsfw(message, img))
    }
};