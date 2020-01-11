const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name:'xp-channel',
    alias:['xp-ch'],
    description:'Activar / desactivar la xp en un canal',
    usage:'xp-channel [channel] < -enable | -disable >',
    permission:'Administrador',
    type:'set',
  
    run: async (message, args) => {
        
        admin(message)
        
        if (!args[0])
            return message.channel.send("Debes introducir el nuevo prefijo\n``prefix <new prefix>``")

        let pr = args.join(' ')
        dbprefix.establecer(`${message.guild.id}`, pr)
        return message.channel.send(`Prefijo cambiado correctamente a \`\`${pr}\`\``)
    }
}