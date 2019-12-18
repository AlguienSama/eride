const Discord = require('discord.js')
const db = require('megadb')

var { deny } = require('../../logs.js')

module.exports = {
    name:'rm-role',
    alias:[],
    description:'',
    usage:'``rm-role <user> <role>``',
  
    run: async (message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        var rolesTag = (message.guild.roles.map(roles => `${roles}`))

        console.log(roles)

    }
}