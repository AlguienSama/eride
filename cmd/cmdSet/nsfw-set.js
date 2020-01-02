const Discord = require('discord.js')
const db = require('megadb')

const { error } = require('../../files/logs.js');
const { admin, adminRole } = require('../../files/perm.js');

module.exports = {
    name:'nsfw-set',
    alias:[],
    description:'Configurar los comandos nsfw\n**off** : Deshabilitar comandos nsfw\n**spoiler** : Las imagenes salen en formato spoiler\n**default** : Salen de forma normal',
    usage:'nsfw-set < off | spoiler | default >',
    permission:'Administrador | Rol Autorizado',

    run: async (message, args) => {

        admin(message)
        adminRole(message)

        

    }
}