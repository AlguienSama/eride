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
        
        if (!xp.tiene(`${message.guild.id}.channelsDisable`))
            xp.establecer(`${message.guild.id}.channelsDisable`, [])
        
        let listChannels = await xp.obtener(`${message.guild.id}.channelsDisable`);

        if (!args[0])
            return message.channel.send("Debes introducir el canal\n``xp-channel [channel] < -enable | -disable >``")

        let canal;
        args[0].trim().startsWith("-") ? canal = message.mentions.channels.first() || message.guild.channels.get(args[0]) : canal = message.channel;

        if (!args[1] || args[1] == "-disable") {
            if (listChannels.tiene())
            xp.push(`${message.guild.id}.channelsDisable`, canal.id)
        }
        else if (args[1] == "-enable") {
            xp.extract(`${message.guild.id}.channelsDisable`, canal.id)
        }
    }
}