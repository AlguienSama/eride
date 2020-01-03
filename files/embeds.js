const Discord = require('discord.js')

const { deny } = require('./logs.js');

module.exports = {
    imgEmbed: async (message, url) => {
        let embedImg = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setImage(url)
        
        return message.channel.send(embedImg)
    },

    imgSpoiler: async (url) => {
        let dom = url.split(".")
        dom = dom[dom.length - 1]
        let spoilerImg ={
            files: [{
                attachment:url,
                name:"SPOILER_IMG."+dom
            }]
        }
        return spoilerImg
    }
  
}