const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

var { error, deny } = require('./logs.js')

module.exports = {
    xp: async (message) => {
        if (!xp.tiene(`${message.guild.id}`))
            await xp.establecer(`${message.guild.id}`, { config: "default", channelsDisable: [] });

        let listChannels = await xp.obtener(`${message.guild.id}.channelsDisable`);

        if (listChannels.tiene(message.channel.id)) return;

        if (await xp.obtener(`${message.guild.id}.config`) === "default") {

            if (!xp.tiene(`${message.guild.id}.users.${message.author.id}`))
                await xp.establecer(`${message.guild.id}.users.${message.author.id}`, { xp: 0, lastMessage: 0 });

            let xpVal = console.log(Math.floor(Math.random()*10)+10);
            
            xp.sumar(`${message.guild.id}.users.${message.author.id}.xp`, xpVal)

        }
    }
}