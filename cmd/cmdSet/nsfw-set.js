const Discord = require('discord.js');
const db = require('megadb');
let bbdd = new db.crearDB('permisos');

const {success, fail} = require("../../files/embeds");
const {error, deny} = require('../../files/logs.js');
const {admin_adminRole} = require('../../files/perm.js');

module.exports = {
    name: 'nsfw-set',
    alias: [],
    description: 'Configurar los comandos nsfw\n**off** : Deshabilitar comandos nsfw\n**spoiler** : Las imagenes salen en formato spoiler\n**default** : Salen de forma normal',
    usage: 'nsfw-set < off | spoiler | default >',
    permission: 'Administrador | Rol Autorizado',
    type: 'set',

    run: async (message, args) => {

        if (!await admin_adminRole(message))
            return deny(message);

        let perm;
        switch (args[0]) {
            case "off":
                await bbdd.establecer(`${message.guild.id}.nsfw`, "off").catch(err => error(message, "Establecer nsfw 001", err));
                perm = "off";
                break;
            case "spoiler":
                await bbdd.establecer(`${message.guild.id}.nsfw`, "spoiler").catch(err => error(message, "Establecer nsfw 002", err));
                perm = "spoiler";
                break;
            case "default":
                await bbdd.eliminar(`${message.guild.id}.nsfw`).catch(err => error(message, "Establecer nsfw 003", err));
                perm = "default";
                break;
            default:
                return fail(message, "Opción no válida")
        }

        return success(message, "Permisos cambiados a **" + perm + "**")

    }
};