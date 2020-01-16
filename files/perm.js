const Discord = require('discord.js');
const db = require('megadb');
const client = new Discord.Client();

const { deny } = require('./logs.js');

module.exports = {
    admin: async (message) => {
        return message.member.hasPermission('ADMINISTRATOR');
    },


    adminRole: async (message)  => {
        let rolID = message.guild.roles.find("name", "everyone");
        return message.member.roles.has(rolID.id);
    },

    patreon: async (message) => {
        /*
        let curioso = message.client.guilds.get("662066249202794497").roles.get("662068055328948255");
        let espia = message.client.guilds.get("662066249202794497").roles.get("662069238856548380");
        let semibot = message.client.guilds.get("662066249202794497").roles.get("662070968830918666");
        let dioscp = message.client.guilds.get("662066249202794497").roles.get("662070922802626591");
        */
        return message.member.roles.some(r => ["662068055328948255", "662069238856548380", "662070968830918666", "662070922802626591"].includes(r.id));
    },

    admin_adminRole: async (message) => {
        let perm = false;
        await admin(message).then(async ad => {
            if (ad) {
                perm = true;
            }
        });
        await adminRole(message).then(async ad => {
            if (ad) {
                perm = true;
            }
        });

        return perm;
    }
  
};