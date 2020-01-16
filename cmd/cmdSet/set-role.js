const Discord = require('discord.js');
const db = require('megadb');

const {success, fail} = require("../../files/embeds");
const {error, deny} = require('../../files/logs.js');
const {admin} = require('../../files/perm.js');

module.exports = {
    name: 'add-role',
    alias: ['añadir-rol'],
    description: 'Agregar un rol a un usuario (everyone para todos)',
    usage: 'add-role <usuario> <nombre del rol>',
    permission: 'Administrador',
    type: 'set',

    run: async (message, args) => {

        if (!await admin(message))
            return deny(message);

        if (!args[0] || !args[1])
            return fail(message, "Comando mal escrito\n``add-role <usuario> <nombre del rol>``");

        let user = args.shift();
        let role = message.guild.roles.find(n => n.name === args.join(" ")) || message.guild.roles.get(args[1]);

        if (role === undefined)
            return fail(message, "Rol no encontrado!");

        if (user === "everyone") {
            let users = [message.guild.members.map(m => m.user)];
            let totalUsers = 0;
            users[0].forEach(u => {
                let member = message.guild.members.get(u.id);
                if (!member.roles.has(role.id)) {
                    member.addRole(role.id);
                    totalUsers++;
                }
            });

            await success(message, `${role.name} agregado correctamente a ${totalUsers} usuarios!`)
        }
    }
};