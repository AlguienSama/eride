const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('./logs.js')

class Player {
    newPlayer() {
        this.life = 3;
        this.action = 0;
        this.accion = "❄️";
        this.dash = 0; 
    }

    getVida() {
        return this.life;
    }

    getAction() {
        return this.action;
    }

    getAccion() {
        return this.accion;
    }

    setAction(act) {
        this.action = act;
    }

    setAccion(acc) {
        this.accion = acc;
    }

    damage(dmg) {
        this.life -= dmg;
    }

    esquivar() {
        this.dash++;
    }

    resetEsquivar() {
        this.dash = 0;
    }

    getEsquivar() {
        return this.dash;
    }
}

module.exports = {
    snowFight: async (message) => {

        const args = message.content.slice(message.prefix.length).split(/ +/)
        const command = args.shift().toLowerCase()

        if (command == "start") {
            if (game.tiene(`${message.channel.id}`)) return message.channel.send("Ya hay una pelea en juego")
            if (message.mentions.users.first()) {
                var msg = `${message.mentions.users.first()} te están retando a una pelea de nieve!`
                game.establecer(`${message.channel.id}.retado`, message.mentions.users.first().id)
            }
            else 
                var msg = message.author +' quiere hacer una pelea de nieve. Quien acepta? ``'+message.prefix+'acept``'
            
            game.establecer(`${message.channel.id}.player1.id`, message.author.id)
            game.establecer(`${message.channel.id}.player1.name`, message.member.nickname)
            message.channel.send(msg)
        }

        if (command == "accept") {
            if (!game.tiene(`${message.channel.id}`)) 
                return message.channel.send("Debes de iniciar una pelea antes")
            if (game.tiene(`${message.channel.id}.retado`) && await game.obtener(`${message.channel.id}.retado`) != message.author.id) 
                return message.channel.send("Tu no eres el usuario retado")
            if (await game.obtener(`${message.channel.id}.player1.id`) == message.author.id)
                return message.channel.send("No puedes pelear contra ti mismo")

            game.establecer(`${message.channel.id}.player2.id`, message.author.id).catch(err => console.log(err))
            game.establecer(`${message.channel.id}.player2.name`, message.member.nickname).catch(err => console.log(err))

            startGame(message)
        }
        
    }
}

async function startGame(message) {

    var player1 = new Player()
    var player2 = new Player()
    player1.newPlayer();
    player2.newPlayer();

    player1.name = await game.obtener(`${message.channel.id}.player1.name`).catch(err => console.log(err))
    player1.id = await game.obtener(`${message.channel.id}.player1.id`).catch(err => console.log(err))
    player2.name = await game.obtener(`${message.channel.id}.player2.name`).catch(err => console.log(err))
    player2.id = await game.obtener(`${message.channel.id}.player2.id`).catch(err => console.log(err))

    let fightEmbed = new Discord.RichEmbed()
        .setTitle("Pelea de bolas de nieve")
        .setColor("#d0d0ff")
        .setDescription(`☄️ **Atacar** \t=> ***a*** \n⛄ **Defender** \t=> ***d*** \n💨 **Esquivar** \t=> ***e***`)
        .addField(player1.name, `Anterior acción: ${player1.getAccion()}\n♥️ Vida: ${player1.getVida()}`, true)
        .addField(player2.name, `Anterior acción: ${player2.getAccion()}\n♥️ Vida: ${player2.getVida()}`, true)

    const filter = m => m.author.id == player1.id || m.author.id == player2.id;

    //do {
        message.channel.send(fightEmbed).then(() => {
            const collector = message.channel.createMessageCollector(filter, { time: 3000 })
            collector.on('end', col => {
                col.forEach(msg => {
                    var player;
                    msg.author.id == player1.id ?  player = player1 : player = player2
                    let act = msg.content.toLowerCase()
                    if (act.includes("a")) {
                        player.setAction("a");
                        player.setAccion("☄️");
                    }
                    else if (act.includes("d")) {
                        player.setAction("d");
                        player.setAccion("⛄");
                    }
                    else if (act.includes("e") && player.getEsquivar() < 2) {
                        player.setAction("e");
                        player.setAccion("💨");
                    }
                    
                });

                
                console.log(player1.getAction())
                console.log(player2.getAction())
                if (player1.getAction() != 0 && player2.getAction() != 0) {
                    doAction(player1, player2)
                } else {
                // ERror
                }
                console.log(player1.getVida() + "\n" + player2.getVida())
            })
        })
    //} while (player1Vida == 0 || player2Vida == 0)

    await game.eliminar(`${message.channel.id}`)
}


function doAction(player1, player2) {
    var act1 = player1.getAction();
    var act2 = player2.getAction();

    var posiblidades = Math.floor(Math.random()*100)
    var esquivar = posiblidades > 30 ? true : false;
    var atacar = posiblidades > 15 ? true : false;
    var posiblidades2 = Math.floor(Math.random()*100)
    var atacar2 = posiblidades2 > 15 ? true : false;

    if (act1 == "e")
        player1.esquivar();
    else
        player1.resetEsquivar();

    if (act2 == "e")
        player2.esquivar();
    else
        player2.resetEsquivar();

    if (act1 == "a") {
        if (act2 == "a") {
            if (atacar)
                player2.damage(1);
            if (atacar2)
                player1.damage(1);
        } else if (act2 == "d") {
            if (atacar)
                player2.damage(0.5)
        } else if (act2 == "e") {
            if (!esquivar)
                player2.damage(1)
        }
    } else if (act1 == "d") {
        if (act2 == "a")
            player1.damage(0.1)
    } else if (act1 == "e") {
        if (act2 == "a")
            if (!esquivar)
                player1.damage(1)
    }
}
// const filter = m => m.author.id == a || m.author.id == a;

//         message.author.get("355104003572498435").send("Hola")
//         .then(() => {
//             message.channel.awaitMessages(filter, { time: 3000 })
//             .then(collected => {
//                 console.log(collected)
//             })
//         })