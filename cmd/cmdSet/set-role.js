const Discord = require('discord.js')
const db = require('megadb')

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name:'add-role',
    alias:['añadir-rol'],
    description:'Agregar un rol a un usuario (everyone para todos)',
    usage:'add-role <usuario> <nombre del rol>',
    permission:'Administrador',
    type:'set',
  
    run: async (message, args) => {
        
        admin(message)
        
        if (!args[0] || !args[1])
            return message.channel.send("Comando mal escrito\n``add-role <usuario> <nombre del rol>``")

        let user = args.shift();
        let role = message.guild.roles.find(n => n.name === args.join(" ")) || message.guild.roles.get(args[1]);

        if (role == undefined)
            return message.channel.send("Rol no encontrado!")

        if (user == "everyone") {
            let users = [message.guild.members.map(m => m.user)];
            let totalUsers = 0;
            users[0].forEach(u => {
                let member = message.guild.members.get(u.id)
                console.log(member)
                if (!member.roles.has(role.id)) {
                    member.addRole(role.id);
                    totalUsers++;
                }
            })
            
            await message.channel.send(`${role.name} agregado correctamente a ${totalUsers} usuarios!`)

        }
    }
}