const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('../../logs.js')

module.exports = {
    run: async (message, args, prefix) => {
        if (message.mentions.users.first())
            var msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`
        else 
            var msg = message.author +' quiere hacer una pelea de nieve. Quien acepta? ``'+prefix+'acept``'
        
            game.establecer(`${message.channel.id}.player1.id`, message.author.id)
        message.channel.send(msg)
    }
}