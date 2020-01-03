const Discord = require('discord.js')

const { deny } = require('./logs.js');

module.exports = {
    imgEmbed: async (url) => {
        let embedImg = new Discord.RichEmbed()
            .setColor('RANDOM')
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
    }
  
}