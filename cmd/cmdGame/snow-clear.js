const Discord = require('discord.js');
const db = require('megadb');
let game = new db.crearDB('games');

const {error, deny} = require('../../files/logs.js');
const {admin_adminRole} = require('../../files/perm.js');
const {success, fail} = require('../../files/embeds.js');

module.exports = {
    name: 'snow-clear',
    alias: ['sn-cl'],
    description: 'Eliminar la pelea iniciada',
    usage: 'snow-clear',
    permission: 'Administrador | Rol Autorizado',
    type: 'snow-game',

    run: async (message, args) => {
        if (!await admin_adminRole(message))
            return deny(message);

        if (!game.tiene(`${message.channel.id}`))
            return fail(message, "No hay ninguna pelea iniciada!");
        await game.eliminar(`${message.channel.id}`).then(() => {
            return success(message, "Pelea eliminada correctamente!");
        }).catch(err => error(message, "Snow Game eliminar partida 001", err))

    }
};