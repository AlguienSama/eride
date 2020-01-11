const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

var { error, deny } = require('./logs.js')

module.exports = {
    xp: async (message) => {
        if (!xp.tiene(`${message.guild.id}`))
            xp.establecer(`${message.guild.id}`, { config: "default", channelsDisable: [] })

        if (await xp.obtener(`${message.guild.id}.config`) === "default") {

            if (!xp.tiene(`${message.guild.id}.users.${message.author.id}`))
                xp.establecer(`${message.guild.id}.users.${message.author.id}`, { xp: 0, lastMessage: 0 })

            

        }
    }
}