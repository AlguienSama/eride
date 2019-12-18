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
        for (var i = 0; message.guild.roles.length()>i; i++){
            console.log(message.guild.role[i].name)
        }

        console.log(message.guild.roles.name)
    }
}