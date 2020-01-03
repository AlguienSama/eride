const Discord = require('discord.js')
const db = require('megadb')
let dbChannelsBL = new db.crearDB('blackList')

const { error } = require('../../files/logs.js');
const { admin, adminRole } = require('../../files/perm.js');

module.exports = {
    name:'channel-enable',
    alias:['ch-en', 'habilitar-canal'],
    description:'Para hacer que el bot pueda hablar en el canal',
    usage:'channel-enable [canal]',
    permission:'Administrador | Rol Autorizado',

    run: async (message, args) => {

        admin(message)
        adminRole(message)

        if (!dbChannelsBL.tiene(`${message.guild.id}.channels`))
            dbChannelsBL.establecer(`${message.guild.id}.channels`, [])

        var canal = message.mentions.channels.first() || client.guilds.get(message.guild.id).channels.get(args[0]) || message.channel

        const datos = await dbChannelsBL.obtener(`${message.guild.id}.channels`).catch(err => error(message, "Obtener canales BL 002", err))

        if (!datos.includes(canal.id))
            return message.channel.send("Ya me podías ejecutar en "+ canal +", pero gracias por intentarme liberar")

        if (dbChannelsBL.tiene(`${message.guild.id}.channels`)) {
            dbChannelsBL.extract(`${message.guild.id}.channels`, canal.id)
            .then(() => { message.channel.send('Ya puedes volver a usarme en '+ canal) })
            .catch(err => error(message, "Extract canal BL 001", err))
        }
        
        return

    }
}