const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

var { error, deny } = require('./files/logs.js')

module.exports = {
    xp: async (message) => {
        
        if (!xp.tiene(`${message.guild.id}`))
            await xp.establecer(`${message.guild.id}`, { slow: 0, channelsDisable: [] });

        if (!xp.tiene(`${message.guild.id}.channelsDisable`))
            xp.establecer(`${message.guild.id}.channelsDisable`, [])
            
        let listChannels = await xp.obtener(`${message.guild.id}.channelsDisable`);

        if (!listChannels.includes(message.channel.id)) {
            
            if (!xp.tiene(`${message.guild.id}.users.${message.author.id}`))
                await xp.establecer(`${message.guild.id}.users.${message.author.id}`, { xp: 0, lastMessage: 0 });

            if (await xp.obtener(`${message.guild.id}.users.${message.author.id}.lastMessage`) < message.createdAt.getTime()) {
                sumarXP(message)
                setTimer(message)
            }

        }
        
    }
}

function sumarXP(message) {
    let xpVal = Math.floor(Math.random()*10)+10;
            
    xp.sumar(`${message.guild.id}.users.${message.author.id}.xp`, xpVal)
}

async function setTimer(message) {
    let slow = await xp.obtener(`${message.guild.id}.slow`);
    let time = message.createdAt.getTime()+slow;

    await xp.establecer(`${message.guild.id}.users.${message.author.id}.lastMessage`, time);
}