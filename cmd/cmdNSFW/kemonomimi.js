const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'kemonomimi',
    alias: [],
    description: 'Hentai de kemonomimi ||orejitas de animales||',
    usage: 'kemonomimi',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.kemonomimi().then(async img => await imgNsfw(message, img))
    }
};