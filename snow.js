const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('./logs.js')

class Player {
    newPlayer(id, name, life) {
        this.id = id;
        this.name = name;
        this.life = life;
        this.action = 0;
    }

    getVida() {
        return this.vida;
    }

    getAction() {
        return this.action;
    }

    setAction(act) {
        this.action = act;
    }

    damage(dmg) {
        this.life -= dmg;
    }

    defensa() {
        this.defensa++;
    }

    resetDefensa() {
        this.defensa = 0;
    }

    getDefensa() {
        return this.defensa;
    }
}

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
            game.establecer(`${message.channel.id}.player1.name`, message.member.nickname)
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

            game.establecer(`${message.channel.id}.player2.id`, message.author.id).catch(err => console.log(err))
            game.establecer(`${message.channel.id}.player2.name`, message.member.nickname).catch(err => console.log(err))
            game.establecer(`${message.channel.id}.player2.life`, 3).catch(err => console.log(err))

            startGame(message, prefix)
        }
        
    }
}

async function startGame(message, prefix) {
    
    var player1Name = await game.obtener(`${message.channel.id}.player1.name`).catch(err => console.log(err))
    var player1Vida = await game.obtener(`${message.channel.id}.player1.life`).catch(err => console.log(err))
    var player1ID = await game.obtener(`${message.channel.id}.player1.id`).catch(err => console.log(err))
    var player2Name = await game.obtener(`${message.channel.id}.player2.name`).catch(err => console.log(err))
    var player2Vida = await game.obtener(`${message.channel.id}.player2.life`).catch(err => console.log(err))
    var player2ID = await game.obtener(`${message.channel.id}.player2.id`).catch(err => console.log(err))

    var player1 = new Player(player1ID, player1Name, player1Vida)
    var player2 = new Player(player2ID, player2Name, player2Vida)


    let fightEmbed = new Discord.RichEmbed()
        .setTitle("Pelea de bolas de nieve")
        .setColor("#d0d0ff")
        .setDescription(`☄️ **Atacar** \t=> ***a*** \n🛡️ **Defender** \t=> ***d*** \n❄️ **Esquivar** \t=> ***e***`)
        .addField(player1Name, `♥️ Vida: ${player1.getVida()}`, true)
        .addField(player2Name, `♥️ Vida: ${player2.getVida()}`, true)

    const filter = m => m.author.id == player1ID || m.author.id == player2ID;

    //do {
        message.channel.send(fightEmbed).then(() => {
            const collector = message.channel.createMessageCollector(filter, { time: 3000 })
            collector.on('end', col => {
                col.forEach(msg => {
                    var player;
                    msg.author.id == player1ID ?  player = player1 : player = player2
                    let act = msg.content.toLowerCase()
                    if (act.includes("a"))
                        player.setAction("a");
                    else if (act.includes("d"))
                        player.setAction("d");
                    else if (act.includes("e") && player.getEsquivar() > 2)
                        player.setAction("e")
                });

                
                console.log(player1.getAction())
                console.log(player2.getAction())
                if (player1.getAction() != 0 && player2.getAction() != 0) {

                } else {
                // ERror
                }
            })
        })
        player1Vida = 0;
    //} while (player1Vida == 0 || player2Vida == 0)

    await game.eliminar(`${message.channel.id}`)
}


function doAction(act1, act2) {
    
    var posiblidades = Math.floor(Math.random()*100)
    var esquivar = posiblidades > 30 ? true : false;
    var atacar = posiblidades > 15 ? true : false;

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
            var atacar = posiblidades > 15 ? true : false;
            if (atacar)
                player1.damage(1);
        } else if (act2 == "d") {
            if (atacar)
                player2.damage(0.5)
        } else if (act2 == "e") {
            if (!esquivar)
                player2.damage(1)
        }
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