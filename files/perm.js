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
    },

    patreon: async (message) => {
        let curioso = message.client.guilds.get("662066249202794497").roles.get("662068055328948255")
        let espia = message.client.guilds.get("662066249202794497").roles.get("662069238856548380")
        let semibot = message.client.guilds.get("662066249202794497").roles.get("662070968830918666")
        let dioscp = message.client.guilds.get("662066249202794497").roles.get("662070922802626591")

        
        if (!message.member.roles.some(r => ["662068055328948255", "662069238856548380", "662070968830918666", "662070922802626591"].includes(r.id))) {
            return deny(message);
        }
    },

    patreonB: async (message) => {
        let curioso = message.client.guilds.get("662066249202794497").roles.get("662068055328948255")
        let espia = message.client.guilds.get("662066249202794497").roles.get("662069238856548380")
        let semibot = message.client.guilds.get("662066249202794497").roles.get("662070968830918666")
        let dioscp = message.client.guilds.get("662066249202794497").roles.get("662070922802626591")

        
        if (message.member.roles.some(r => ["662068055328948255", "662069238856548380", "662070968830918666", "662070922802626591"].includes(r.id))) {
            return true; 
        }
        return false;
    }
  
}