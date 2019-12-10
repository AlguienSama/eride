const Discord = require('discord.js')
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
          var msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`
        else 
          var msg = message.author +' quiere hacer una pelea de nieve. Quien acepta? ``'+prefix+'acept``'
          
        message.channel.send(msg)

        const filter = m => {
          m.content.includes(prefix+'aceptar');
          if (message.mentions.users.first())
            message.mentions.users.first().id === m.author.id
        }
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });

      const player1 = message.author
      
      collector.on('collect', async m => {
          const player2 = m.author
          
          message.channel.send("Player1 "+ player1 +"\nPlayer2 "+ player2)
      })
        
        
    }
}