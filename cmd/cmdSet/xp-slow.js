const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name:'xp-slow',
    alias:['xp-sl'],
    description:'Forma de ganar xp en el servidor\n'+
    '**Slow:** Se gana xp por 1 mensaje con una cuenta atrás de los segundos especificados (0 por defecto)',
    usage:'xp-type < segundos >',
    permission:'Administrador',
    type:'set',
  
    run: async (message, args) => {
        
        admin(message)
        
        if (!args[0])
            return message.channel.send("``xp-slow < segundos >``\nTiempo actual: **" + await xp.obtener(`${message.guild.id}.slow`) + '** segundos')

        let sec = parseInt()
    }
}