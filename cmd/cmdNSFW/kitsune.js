const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'kitsune',
    alias: ['kitsunes'],
    description: 'Imagenes de kitsunes',
    usage: 'kitsune',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.kitsune().then(async img => await imgNsfw(message, img))
    }
};