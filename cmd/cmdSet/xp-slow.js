const Discord = require('discord.js');
const db = require('megadb');
let xp = new db.crearDB('xp');


const {fail, success} = require("../../files/embeds");
const {error, deny} = require('../../files/logs.js');
const {admin} = require('../../files/perm.js');

module.exports = {
    name: 'xp-slow',
    alias: ['xp-sl'],
    description: 'Forma de ganar xp en el servidor\n' +
        '**Slow:** Se gana xp por 1 mensaje con una cuenta atrás de los segundos especificados (0 por defecto)',
    usage: 'xp-type < segundos >',
    permission: 'Administrador',
    type: 'xp',

    run: async (message, args) => {

        if (!await admin(message))
            return deny(message);

        if (!args[0])
            return fail(message, "``xp-slow < segundos >``\nTiempo actual: **" + await xp.obtener(`${message.guild.id}.slow`).catch(err => error(message, "Obtener XP slow 01", err)) + '** segundos');

        let sec = parseInt(args[0]);

        await xp.establecer(`${message.guild.id}.slow`, sec).then(() => {
            return success(message, 'Slow cambiado a **' + sec + '** segundos')
        })
    }
};