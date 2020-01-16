const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'smallboobs',
    alias: ['smalloppais'],
    description: 'Hentai de oppais pequeñas',
    usage: 'smallboobs',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.smallBoobs().then(async img => await imgNsfw(message, img))
    }
};