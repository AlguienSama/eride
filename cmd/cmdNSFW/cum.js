const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'cum',
    alias: ['corrida'],
    description: 'Corridas',
    usage: 'cum',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.cumsluts().then(async img => await imgNsfw(message, img))
    }
};