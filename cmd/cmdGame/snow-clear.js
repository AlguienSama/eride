const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

const {error, deny} = require('../../logs.js');

module.exports = {
    name:'snow-clear',
    alias:['sn-cl'],
    description:'Eliminar la pelea iniciada',
    usage:'snow-clear',
    permission:'Administrador | Rol Autorizado',
  
    run: async (message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return deny(message)
            
        if (!game.tiene(`${message.channel.id}`))
            return message.channel.send("No hay ninguna pelea iniciada!");
        await game.eliminar(`${message.channel.id}`).then(() => {
            return message.channel.send("Pelea eliminada correctamente!")
        })
    
    }
}