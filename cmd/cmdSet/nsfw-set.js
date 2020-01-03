const Discord = require('discord.js')
const db = require('megadb')
let bbdd = new db.crearDB('permisos')

const { error } = require('../../files/logs.js');
const { admin, adminRole } = require('../../files/perm.js');

module.exports = {
    name:'nsfw-set',
    alias:[],
    description:'Configurar los comandos nsfw\n**off** : Deshabilitar comandos nsfw\n**spoiler** : Las imagenes salen en formato spoiler\n**default** : Salen de forma normal',
    usage:'nsfw-set < off | spoiler | default >',
    permission:'Administrador | Rol Autorizado',

    run: async (message, args) => {
        
        if (await adminB(message) && await adminRoleB(message)) return

        let perm;
        switch (args[0]) {
            case "off":
                bbdd.establecer(`${message.guild.id}.nsfw`, "off");
                perm = "off";
                break;
            case "spoiler":
                bbdd.establecer(`${message.guild.id}.nsfw`, "spoiler");
                perm = "spoiler";
                break;
            case "default":
                bbdd.eliminar(`${message.guild.id}.nsfw`);
                perm = "default";
                break;
            default:
                return message.channel.send("Opción no válida")
        }

        return message.channel.send("Permisos cambiados a **"+ perm + "**")

    }
}