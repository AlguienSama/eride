const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

const {error, deny} = require('../../logs.js');

module.exports = {
    name:'snow-start',
    alias:['sn-st'],
    description:'Empezar una pelea de nieve',
    usage:'snow-start [usuario]',
  
    run: async (message, args) => {
        let msg;

        if (game.tiene(`${message.channel.id}`)) return message.channel.send("Ya hay una pelea en juego");
            
        if (message.mentions.users.first()) {
            msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`;
            game.establecer(`${message.channel.id}.retado`, message.mentions.users.first().id)
        } else
            msg = message.author + ' quiere hacer una pelea de nieve. Quien acepta? ``' + message.prefix + 'accept``';

        game.establecer(`${message.channel.id}.player1.id`, message.author.id);
        game.establecer(`${message.channel.id}.player1.name`, message.member.displayName);
        message.channel.send(msg)
    }
}