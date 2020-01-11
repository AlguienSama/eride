const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name:'xp-channel',
    alias:['xp-ch'],
    description:'Forma de ganar xp en el servidor\n**Default:** Se gana xp por cada mensaje\n'+
    '**Slow:** Solo se gana xp por 1 mensaje durante los segundos especificados (1 minuto por defecto)',
    usage:'xp-type < segundos >',
    permission:'Administrador',
    type:'set',
  
    run: async (message, args) => {
        
        admin(message)
        
        if (!args[0])
            return message.channel.send("``xp-type < default | slow [segundos] >``\nTipo actual: " + await xp.obtener(`${message.guild.id}.config`))

        
    }
}