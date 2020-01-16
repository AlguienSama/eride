const Discord = require('discord.js');
const db = require('megadb');
let dbprefix = new db.crearDB('prefix');

const {success, fail} = require("../../files/embeds");
const {error, deny} = require('../../files/logs.js');
const {admin} = require('../../files/perm.js');

module.exports = {
    name: 'prefix',
    alias: [],
    description: 'Cambiar el prefijo',
    usage: 'prefix <new prefix>',
    permission: 'Administrador',
    type: 'set',

    run: async (message, args) => {

        if (!await admin(message))
            return deny(message);

        if (!args[0])
            return fail(message,"Debes introducir el nuevo prefijo\n``prefix <new prefix>``");

        let pr = args.join(' ');
        dbprefix.establecer(`${message.guild.id}`, pr).catch(err => error(message, "Establecer prefix 001", err));
        return success(message, `Prefijo cambiado correctamente a \`\`${pr}\`\``)
    }
};