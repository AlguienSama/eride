const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require("../../files/varios");

module.exports = {
    name: 'erokitsune',
    alias: ['erokitsunes'],
    description: 'Imagenes de ero kitsunes',
    usage: 'erokitsune',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.eroKitsune().then(async img => await imgNsfw(message, img))
    }
};