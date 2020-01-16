const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'trap',
    alias: ['traps'],
    description: 'Hentai de trapos',
    usage: 'trap',
    permission: 'none',
    type: 'nsfw',

    run: async (message, args) => {

        neko.nsfw.trap().then(async img => await imgNsfw(message, img))
    }
};