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
        let  ={
            files: [{

            }]
        }
    }
  
}