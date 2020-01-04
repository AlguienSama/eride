const Discord = require('discord.js')

const { deny } = require('./logs.js');

module.exports = {
    imgEmbed: async (url) => {
        let embedImg = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(url)
        
        return embedImg
    },

    imgDescEmbed: async (desc, url) => {
        let embedImg = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(desc)
            .setImage(url)
        
        return embedImg
    },

    imgSpoiler: async (url) => {
        let dom = url.split(".")
        dom = dom[dom.length - 1]
        console.log("THIS => "+ dom);
        
        let spoilerImg ={
            files: [{
                attachment:url,
                name:"SPOILER_IMG."+dom
            }]
        }
        return spoilerImg
    },

    guildInfo: async (guild, color = "#9292ff") => {
        let guildEmbed = new Discord.RichEmbed()
            .setTitle("Servidor: "+ guild.name +" ``"+ guild.id + "``")
            .setThumbnail(guild.iconURL)
            .setDescription("Owner: "+ guild.owner +" ``"+guild.ownerID +"``")
            .addField("Miembros: ", guild.memberCount)
            .addField("Región: ", guild.region)
            .setFooter("Creado: " + guild.createdTimestamp)
            .setColor(color)

        return guildEmbed
    }
  
}