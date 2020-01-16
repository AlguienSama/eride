const Discord = require('discord.js');
const db = require('megadb');
let xp = new db.crearDB('xp');

const {error} = require('./files/logs.js');

module.exports = {
    xp: async (message) => {

        if (!xp.tiene(`${message.guild.id}`))
            await xp.establecer(`${message.guild.id}`, {
                slow: 0,
                channelsDisable: []
            }).catch(err => error(message, "New user xp 001", err));

        if (!xp.tiene(`${message.guild.id}.channelsDisable`))
            xp.establecer(`${message.guild.id}.channelsDisable`, []).catch(err => error(message, "Establecer Canal xp basic", err));

        let listChannels = await xp.obtener(`${message.guild.id}.channelsDisable`);

        if (!listChannels.includes(message.channel.id)) {

            if (!xp.tiene(`${message.guild.id}.users.${message.author.id}`))
                await xp.establecer(`${message.guild.id}.users.${message.author.id}`, {xp: 0, lastMessage: 0})
                    .catch(err => error(message, "Establecer xp 001", err));

            if (await xp.obtener(`${message.guild.id}.users.${message.author.id}.lastMessage`) < message.createdAt.getTime()) {
                sumarXP(message);
                await setTimer(message)
            }

        }

    }
};

function sumarXP(message) {
    let xpVal = Math.floor(Math.random() * 10) + 10;

    xp.sumar(`${message.guild.id}.users.${message.author.id}.xp`, xpVal)
        .catch(err => error(message, "Sumar xp 001", err));
}

async function setTimer(message) {
    let slow = await xp.obtener(`${message.guild.id}.slow`);
    let time = message.createdAt.getTime() + (slow * 1000);

    await xp.establecer(`${message.guild.id}.users.${message.author.id}.lastMessage`, time)
        .catch(err => error(message, "Establecer timer 001", err));
}