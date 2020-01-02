const Discord = require('discord.js')
const db = require('megadb')

var { deny } = require('../../logs.js')

module.exports = {
    name:'role-list',
    alias:['list-role'],
    description:'Listado de roles del servidor o de un usuario',
    usage:'``role-list <user>``',
    permission:'Administrador | Rol Autorizado',
  
    run: async (message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        var rolesId = (message.guild.roles.map(roles => `${roles.id}`))

        for (let i = 0; i < rolesId.length; i++) {
            const role = message.guild.roles.get(rolesId[i]);
            console.log(role.name)
            console.log(role.id)
            console.log(role.permissions)
            console.log("\n-\n");
            
        }

        console.log()

    }
}