const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let poll = new db.crearDB('polls')

var { error, deny } = require('../../logs.js')

module.exports = {
    name:'createpoll',
    alias:['newpoll'],
    description:'Crear una nueva poll personalizada',
    usage:'``createpoll``',
  
    run: async (message, args, prefix) => {

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);

        var pollName = args.join(" ")

        message.channel.send("Introduzca el comado de la colección: ")

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });

        collector.on('collect', async message => {
            var pollCommand = message.content
            let pollEmbed1 = new Discord.RichEmbed()
                .setTitle('Poll '+ pollName +' ``'+prefix,pollCommand+'``')
                .setDescription("Selecciona la opción que quieras")
                .addField("Una carta única", "<:firefoxRed:650668882994135051> La carta solo la podrá obtener un único usuario")
                .addField("Multiples cartas", "<:firefoxBlue:650668928275841025> Cada usuario podrá tener la misma carta")
            
            message.channel.send(pollEmbed1).then(async mensaje => {
                const oneCard = mensaje.createReactionCollector((reaction, user) => {
                    return reaction.emoji.name === "♈" && user.id == message.author.id;
                })
                const multCard = mensaje.createReactionCollector((reaction, user) => {
                    return reaction.emoji.name == "🔯" && user.id == message.author.id;
                })            
                
                oneCard.on('collector', async () => {
                    message.channel.send("Red")
                })
                
                multCard.on('collector', async () => {
                    message.channel.send("Blue")
                })
    
                await mensaje.react("♈").catch(err => error(mensaje, "Reaction createPoll 01 => ", err))
                await mensaje.react("🔯").catch(err => error(mensaje, "Reaction createPoll 02 => ", err))
                 
            }).catch(err => message.channel.send(err))
            
            
        })
                    /*.then(async msg => {
                        const reactCollector = msg.createReactionCollector((reaction, user) => {
                        
                        })
                        reactCollector.on('collect', async (reaction, reactionCollector) => {
                            if (reaction.emoji.id === "650668882994135051") {
                                message.channel.send("red")
                            }
                            else if (reaction.emoji.id === "650668928275841025") {
                                message.channel.send("Bllue")
                            } else {
                                message.channel.send("F")
                            }
                        })
                    })
                .catch(err => error(message, "Reaction createPoll 03 => ", err))
        })*/

             
        
        // .then(() => {
        //     message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        //         .then(collected => {
        //       console.log("collected "+collected)
        //             let pollEmbed1 = new Discord.RichEmbed()
        //                 .setTitle('Poll ``'+collected+'``')
        //                 .setDescription("Selecciona la opción que quieras")
        //                 .addField("Una carta única", "<:firefoxRed:650668882994135051> La carta solo la podrá obtener un único usuario")
        //                 .addField("Multiples cartas", "<:firefoxBlue:650668928275841025> Cada usuario podrá tener la misma carta")
        //             message.channel.send(pollEmbed1)
        //                 .then(async m => {
        //                     await m.react(client.emojis.get("650668882994135051"))
        //                     await m.react(client.emojis.get("650668928275841025"))

        //                     message.awaitReactions(filter, { max: 1, time: 6000, errors: ['Time'] })
        //                         .then(async reaction => {
        //                             let pollEmbed = new Discord.RichEmbed()
        //                                 .setTitle('Poll ``'+collected+'`` creada correctamente')
        //                             if (reaction.emoji.id == "650668882994135051") {
        //                                 pollEmbed.setDescription("Una carta única")
        //                             } else if (reaction.emoji.id == "650668928275841025") {
        //                                 pollEmbed.setDescription("Múltiples cartas")
        //                             }
        //                             return message.channel.send(pollEmbed)
        //                         })
        //                         .catch(err => message.channel.send("Error createPoll reaction"+ err))
        //                 })
        //         })
        //         .catch(err => {
        //             message.channel.send("Error createPoll name"+ err)
        //         })
        // })
    }
}