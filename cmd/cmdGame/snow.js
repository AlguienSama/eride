onst Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let poll = new db.crearDB('polls')

var { error, deny } = require('../../logs.js')

module.exports = {
    name:'pelear',
    alias:['newcard'],
    description:'Añadir una nueva carta personalizada',
    usage:'``addcard``',
  
    run: async (message, args, prefix) => {
        if (message.mentions.users.first())
          `${message.mentions.users.first()} te están retando a una pelea de nieve!`)
        else 
          message.channel.send(message.author +' quiere hacer una pelea de nieve. Quien acepta? ``'+prefix+'acept``')
        
    }
}