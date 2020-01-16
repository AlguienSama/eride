const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'futanari',
    alias: ['futa'],
    description: 'Futanari',
    usage: 'futanari',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.futanari().then(async img => await imgNsfw(message, img))

    }
};