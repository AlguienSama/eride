const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { patreon, patreonB } = require('../../files/perm.js');

module.exports = {
    name:'xp-img',
    alias:[],
    description:'Añadir imagen en el banner de XP',
    usage:'xp-img < url >',
    permission:'Patreon',
    type:'xp',
  
    run: async (message, args) => {
        console.log(patreonB(message))
        if (patreonB(message) == false) {
            console.log("a")
            return await patreon(message)
        }
        
        if (!args[0])
            return message.channel.send("Comando mal introducido: ``xp-img < url >``")

        //xp.establecer(`patreon.${message.user.id}.img`)
        
    }
}