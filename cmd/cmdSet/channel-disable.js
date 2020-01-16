const Discord = require('discord.js');
const db = require('megadb');
let dbChannelsBL = new db.crearDB('blackList');

const {fail, success} = require("../../files/embeds");
const {error, deny} = require('../../files/logs');
const {admin_adminRole} = require('../../files/perm');

module.exports = {
    name: 'channel-disable',
    alias: ['ch-di', 'deshabilitar-canal'],
    description: 'Para hacer que el bot **no** pueda hablar en el canal',
    usage: 'channel-disable [canal]',
    permission: 'Administrador | Rol Autorizado',
    type: 'set',

    run: async (message, args) => {

        if (!await admin_adminRole(message))
            return deny(message);

        if (!dbChannelsBL.tiene(`${message.guild.id}.channels`))
            dbChannelsBL.establecer(`${message.guild.id}.channels`, []);

        const canal = message.mentions.channels.first() || client.guilds.get(message.guild.id).channels.get(args[0]) || message.channel;

        const datos = await dbChannelsBL.obtener(`${message.guild.id}.channels`).catch(err => error(message, "Obtener canales BL 002", err));

        if (datos.includes(canal.id))
            return fail(message, "Ya tenia bloqueado " + canal + "...");

        dbChannelsBL.push(`${message.guild.id}.channels`, canal.id)
            .then(() => {
                success(message, 'De acuerdo, no acataré órdenes en ' + canal)
            })
            .catch(err => error(message, "Push canal BL 001", err));

    }
};