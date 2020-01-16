const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'femdom',
    alias: [],
    description: 'Hentai de femdom ||algo como yuri||',
    usage: 'femodom',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.femdom().then(async img => await imgNsfw(message, img))
    }
};