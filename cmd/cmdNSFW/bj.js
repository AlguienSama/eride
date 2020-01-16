const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'bj',
    alias: ['mamada'],
    description: 'Blow job ||mamada||',
    usage: 'bj',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.bJ().then(async img => await imgNsfw(message, img))
    }
};