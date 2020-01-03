const Discord = require('discord.js')
const db = require('megadb')
const client = new Discord.Client()

const { deny } = require('./logs.js');

module.exports = {
    admin: async (message) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return deny(message)
        else return false
    },

    adminB: async (message) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return false
        else return true
    },

    adminRole: async (message)  => {
        let rolID = message.guild.roles.find("name", "everyone")
        if (!message.member.roles.has(rolID)) return deny(message)
        else return false
    },

    adminRoleB: async (message)  => {
        let rolID = message.guild.roles.find("name", "everyone")
        if (!message.member.roles.has(rolID)) return false
        else return true
    }
  
}