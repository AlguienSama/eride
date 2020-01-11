const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

var { error, deny } = require('./files/logs.js')

module.exports = {
    xp: async (message) => {
        if (!xp.tiene(`${message.guild.id}`))
            await xp.establecer(`${message.guild.id}`, { config: "default", channelsDisable: [] });

        let listChannels = await xp.obtener(`${message.guild.id}.channelsDisable`);

        if (listChannels.includes(message.channel.id)) 
            return;

        if (!xp.tiene(`${message.guild.id}.users.${message.author.id}`))
            await xp.establecer(`${message.guild.id}.users.${message.author.id}`, { xp: 0, lastMessage: 0 });

        if (await xp.obtener(`${message.guild.id}.config`) === "default") {

            sumarXP(message);

        } 
        
        else if (await xp.obtener(`${message.guild.id}.config`) === "slow") {

            if (await xp.obtener(`${message.guild.id}.users.${message.author.id}.lastMessage` > message.createdAt.getTime())) 
                return;

            sumarXP(message);
            setTimer(message);
        }
    }
}

function sumarXP(message) {
    let xpVal = console.log(Math.floor(Math.random()*10)+10);
            
    xp.sumar(`${message.guild.id}.users.${message.author.id}.xp`, xpVal)
}

async function setTimer(message) {
    let time = message.createdAt.getTime()+60000;

    await xp.establecer(`${message.guild.id}.users.${message.author.id}.lastMessage`, time);
}