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

    guildInfo: async (guild, color) => {
        let guildEmbed = new Discord.RichEmbed()
            .setTitle("Servidor: "+ guild.name +" "+ guild.id)
            .setAuthor("Owner: "+ guild.ownerID, guild.iconURL)
    }
  
}