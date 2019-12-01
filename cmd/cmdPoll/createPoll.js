const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let poll = new db.crearDB('polls')

var { deny } = require('../../logs.js')

module.exports = {
    name:'createpoll',
    alias:['newpoll'],
    description:'Crear una nueva poll personalizada',
    usage:'``createpoll``',
  
    run: async (message, args, prefix) => {

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        var filterU = (user) => {
            user.id === message.author.id
        }

        message.channel.send("Introduzca el nombre de la colección: ").then(() => {
            message.channel.awaitMessages(filterU, { time: 300000, errors: ['time'] })
                .then(collected => {
                    let pollEmbed1 = new Discord.RichEmbed()
                        .setTitle('Poll ``'+collected+'``')
                        .setDescription("Selecciona la opción que quieras")
                        .addField("Una carta única", "<:firefoxRed:650668882994135051> La carta solo la podrá obtener un único usuario")
                        .addField("Multiples cartas", "<:firefoxBlue:650668928275841025> Cada usuario podrá tener la misma carta")
                    message.channel.send(pollEmbed1)
                        .then(async m => {
                            await m.react(client.emojis.get("650668882994135051"))
                            await m.react(client.emojis.get("650668928275841025"))

                            message.awaitReactions(filterU, { max: 1, time: 6000, errors: ['Time'] })
                                .then(async reaction => {
                                    let pollEmbed = new Discord.RichEmbed()
                                        .setTitle('Poll ``'+collected+'`` creada correctamente')
                                    if (reaction.emoji.id == "650668882994135051") {
                                        pollEmbed.setDescription("Una carta única")
                                    } else if (reaction.emoji.id == "650668928275841025") {
                                        pollEmbed.setDescription("Múltiples cartas")
                                    }
                                    return message.channel.send(pollEmbed)
                                })
                                .catch(err => message.channel.send("Error createPoll reaction"+ err))
                        })
                })
                .catch(err => {
                    message.channel.send("Error createPoll name"+ err)
                })
        })
    }
}