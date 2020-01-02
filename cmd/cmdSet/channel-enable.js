const Discord = require('discord.js')
const db = require('megadb')
let dbChannelsBL = new db.crearDB('channelBL')

const { error } = require('../../files/logs.js');
const { admin, adminRole } = require('../../files/perm.js');

module.exports = {
    name:'channel-enable',
    alias:['ch-en', 'abilitar-canal'],
    description:'Para hacer que el bot pueda hablar en el canal',
    usage:'channel-enable [canal]',
    permission:'Administrador | Rol Autorizado',

    run: async (message, args) => {

        var canal = message.mentions.channels.first() || message.channel

    }
}