const Discord = require('discord.js')
const db = require('megadb')
let dbChannelsBL = new db.crearDB('channelBL')

module.exports = {
    name:'',
    alias:[],
    description:'',
    usage:'',
    permission:'Administrador | Rol Autorizado',

    run: async (message, args) => {

        
        var canal = message.mentions.channels.first() || message.channel
    }
}