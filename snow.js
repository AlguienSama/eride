const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('./logs.js')

module.exports = {
    snowFight: async (message, prefix) => {

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
            game.establecer(`${message.channel.id}.player1.name`, message.author.username)
            game.establecer(`${message.channel.id}.player1.life`, 3)
            message.channel.send(msg)
        }

        if (command == "accept") {
            if (!game.tiene(`${message.channel.id}`)) 
                return message.channel.send("Debes de iniciar una pelea antes")
            if (game.tiene(`${message.channel.id}.retado`) && await game.obtener(`${message.channel.id}.retado`) != message.author.id) 
                return message.channel.send("Tu no eres el usuario retado")
            if (await game.obtener(`${message.channel.id}.player1.id`) == message.author.id)
                return message.channel.send("No puedes pelear contra ti mismo")

            console.log("a")
            game.establecer(`${message.channel.id}.player2.id`, message.author.id).catch(err => console.log(err))
            game.establecer(`${message.channel.id}.player2.name`, message.author.username).catch(err => console.log(err))
            game.establecer(`${message.channel.id}.player2.life`, 3).catch(err => console.log(err))

            startGame(message, prefix)
        }
        
    }
}

async function startGame(message, prefix) {
    var player1Name = await game.obtener(`${message.channel.id}.player1.name`).catch(err => console.log(err))
    var player1Vida = await game.obtener(`${message.channel.id}.player1.life`).catch(err => console.log(err))
    var player2Name = await game.obtener(`${message.channel.id}.player2.name`).catch(err => console.log(err))
    var player2Vida = await game.obtener(`${message.channel.id}.player2.life`).catch(err => console.log(err))
    console.log("b")
    let fightEmbed = new Discord.RichEmbed()
        .setTitle("Pelea de bolas de nieve")
        .setColor("#d0d0ff")
        .setDescription(`☄️ **Atacar** \t=> ***a*** \n🛡️ **Defender** \t=> ***d*** \n❄️ **Recargar** \t=> ***r***`)
        .addField(player1Name, `♥️ Vida: ${player1Vida}`, true)
        .addField(player2Name, `♥️ Vida: ${player2Vida}`, true)
    message.channel.send(fightEmbed)
    await game.eliminar(`${message.channel.id}`)
}