const Discord = require('discord.js');

module.exports = {

    success: async (message, text) => {
        return new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(text)
            .setColor("#41ff78")
    },

    fail: async (message, text) => {
        return new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(text)
            .setColor("#ff5e7c")
    },

    imgEmbed: async (url) => {
        return new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(url)
    },

    imgDescEmbed: async (desc, url) => {
        return new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(desc)
            .setImage(url)
    },

    imgSpoiler: async (url) => {
        let dom = url.split(".");
        dom = dom[dom.length - 1];

        return {
            files: [{
                attachment: url,
                name: "SPOILER_IMG." + dom
            }]
        }
    },

    guildInfo: async (guild, color = "#9292ff") => {

        return new Discord.RichEmbed()
            .setTitle("Servidor: " + guild.name + " ``" + guild.id + "``")
            .setThumbnail(guild.iconURL)
            .setDescription("Owner: " + guild.owner + " ``" + guild.ownerID + "``")
            .addField("Miembros: ", guild.memberCount)
            .addField("Región: ", guild.region)
            .setFooter("Creado: " + guild.createdAt)
            .setColor(color)
    }
  
};