const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('../../logs.js')

module.exports = {
    run: async (message, prefix) => {

        const args = message.content.slice(prefix.length).split(/ +/)
        const command = args.shift().toLowerCase()

        if (command == "start") {
            if (game.tiene(`${message.channel.id}`)) return message.channel.send("Ya hay una pelea en juego")
            if (message.mentions.users.first()) {
                var msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`
                game.establecer(`${message.channel.id}.retado`, message.mentions.users.first().id)
            }
            else 
                var msg = message.author +' quiere hacer una pelea de nieve. Quien acepta? ``'+prefix+'acept``'
            
            game.establecer(`${message.channel.id}.player1.id`, message.author.id)
            game.establecer(`${message.channel.id}.player1.life`, 3)
            message.channel.send(msg)
        }

        if (command == "accept") {
            if (!game.tiene(`${message.channel.id}`)) 
                return message.channel.send("Debes de iniciar una pelea antes")
            if (await game.obtener(`${message.channel.id}.retado`) != message.author.id) 
                return message.channel.send("Tu no eres el usuario retado")
            if (await game.obtener(`${message.channel.id}.player1.id`) == message.author.id)
                return message.channel.send("No puedes pelear contra ti mismo")

            game.establecer(`${message.channel.id}.player2.id`, message.author.id)
            game.establecer(`${message.channel.id}.player2.life`, 3)

            startGame(message)
        }
        
    }
}

function startGame(message) {
    let fightEmbed = new Discord.RichEmbed()
        .setTitle("Pelea de bolas de nieve")
        .setDescription(`**Atacar** = ${prefix}a \t **Defender** ${prefix}d \t **Recargar** ${prefix}r`)
        .addField()
}