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

        message.channel.send("Introduzca el comado para mostrar las cartas")

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
                    return reaction.emoji.name === "firefoxRed" && user.id === message.author.id;
                })
                const multCard = mensaje.createReactionCollector((reaction, user) => {
                    return reaction.emoji.name === "firefoxBlue" && user.id === message.author.id;
                })            
                
                oneCard.on('collect', async () => {
                    message.channel.send("Red")
                })
                
                multCard.on('collect', async () => {
                    message.channel.send("Blue")
                })
    
                await mensaje.react("650668882994135051").catch(err => error(mensaje, "Reaction createPoll 01 => ", err))
                await mensaje.react("650668928275841025").catch(err => error(mensaje, "Reaction createPoll 02 => ", err))
                 
            }).catch(err => message.channel.send(err))
            
        })
                    
    }
}