const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { patreon } = require('../../files/perm.js');

module.exports = {
    name:'xp-img',
    alias:[],
    description:'Añadir imagen en el banner de XP',
    usage:'xp-img < url >',
    permission:'Patreon',
    type:'xp',
  
    run: async (message, args) => {
        
        if (!patreon(message)) 
            return
        
        if (!args[0])
            return message.channel.send("Comando mal introducido: ``xp-img < url >``")

        //xp.establecer(`patreon.${message.user.id}.img`)
        
    }
}