const Discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();

const {imgNsfw} = require('../../files/varios.js');

module.exports = {
    name: 'hentaigif',
    alias: [],
    description: 'Hentai gif',
    usage: 'hentaigif',
    permission:'none',
    type:'nsfw',

    run: async (message, args) => {
        
        neko.nsfw.randomHentaiGif().then(async img => await imgNsfw(message, img))
    }
};