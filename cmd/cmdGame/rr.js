const Discord = require('discord.js')
const db = require('megadb')
let game = new db.crearDB('games')
let bank = new db.crearDB('bank')

//const moneda = await bank.obtener(`${message.guild.id}.moneda`)

function pad(padStr, max) {
    var str = padStr.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

module.exports = {
    name: 'rr',
    alias: ['rusian-roulette'],
    description: 'Un máximo de 6 jugadores donde 1 va a morir',

    init: async clientTest => {
        clientTest.on('ready', async () => {
            setInterval(async () => {
                if(!game.tiene('rr')) return
                for (const idChannel of await game.keys('rr').catch(err => console.log("notFound1 => " + err))) {
                    var time = await game.obtener(`rr.${idChannel}.time`).catch(err => console.log("notFound2 => " + err))
                    
                    if (time <= new Date().getTime()) {
                        //await game.eliminar(`rr.${idChannel}`).catch(err => console.log("notFound3 => "+ err))
                    }
                }
            }, 1000);
        })
        client = clientTest;
    },

    run: async (message, args, rolIT, client) => {

        function jugadoresList(message, time, jugadores) {
            var finalTime = Math.floor(message.createdAt.getTime() / 1000);
            var remainingTime = time - finalTime;

            var hours = Math.floor(remainingTime / 3600);
            var minutes = pad(Math.floor((remainingTime % 3600) / 60), 2);
            var seconds = pad(remainingTime % 60, 2);

            if (hours == 0) {
                var result = minutes + " minutos y " + seconds + " segundos";
            } else {
                var result = hours + " horas y " + minutes + " minutos";
            }

            let playersEmbed = new Discord.RichEmbed()
                .setTitle('Ruleta Rusa')
                .setDescription(result + " restates")
                .addField('Listado de jugadores', jugadores)
                .setFooter("IT Crowd", "https://cdn.discordapp.com/emojis/562075100116156418.png")

            return message.channel.send(playersEmbed);
        }

        var auth = await bank.obtener(`${message.guild.id}.${message.author.id}.money`).catch(error => message.channel.send("Error al obtener usuario ***coinflip*** => " + error))
        

        var dinero = Number.parseInt(args[0]);
        if (!dinero) return message.channel.send("Introduce valores válidos");

        if (dinero > auth) return message.channel.send("Dinero insuficiente!"); // poner dinero limite (?)

        if (!game.tiene(`rr.${message.channel.id}`)) {
            var time = new Date().getTime() / 1000 + 300;
            await game.establecer(`rr.${message.channel.id}.player1`, { player: message.author.id, money: dinero });
            await game.establecer(`rr.${message.channel.id}`, {time: time})
        } else {
            let numPlayer = await game.keys(`rr.${message.channel.id}`) + 1;
            await game.establecer(`rr.${message.channel.id}.player${numPlayer}`, { player: message.author.id, money: dinero });
        }

        console.log("Jugador: "+await game.obtener(`rr.${message.channel.id}.player1.player`))
        
        var jugadores = [];
        for (i = 0; i < await game.keys(`rr.${message.channel.id}`) - 1; i++) {
            jugadores[i] = '<@' + await game.obtener(`rr.${message.channel.id}.player${i + 1}.player`) + '>';
        }
        jugadores.toString();
        console.log(jugadores)
        jugadoresList(message, time, jugadores)

    }
}