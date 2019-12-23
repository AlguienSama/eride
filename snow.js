const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
let game = new db.crearDB('games');

const {error, deny} = require('./logs.js');

class Player {
    newPlayer() {
        this.life = 5;
        this.action = "⛄";
        this.accion = "❄";
        this.taunt = 0;
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

    setTaunt() {
        this.taunt++;
    }

    getTaunt() {
        return this.taunt;
    }
}

module.exports = {
    snowFight: async (message) => {

        const args = message.content.slice(message.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        let msg;
        if (command === "start") {
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

        if (command === "accept") {
            if (!game.tiene(`${message.channel.id}`)) 
                return message.channel.send("Debes de iniciar una pelea antes");
            if (game.tiene(`${message.channel.id}.retado`) && await game.obtener(`${message.channel.id}.retado`) !== message.author.id)
                return message.channel.send("Tu no eres el usuario retado");
            if (await game.obtener(`${message.channel.id}.player1.id`) === message.author.id)
                return message.channel.send("No puedes pelear contra ti mismo");

            game.establecer(`${message.channel.id}.player2.id`, message.author.id).catch(err => console.log(err));
            game.establecer(`${message.channel.id}.player2.name`, message.member.displayName).catch(err => console.log(err));

            await startGame(message)
        }

        if (command === "help") {
            let fightEmbed = new Discord.RichEmbed()
                .setTitle("Pelea de bolas de nieve")
                .setColor("#d0d0ff")
                .setDescription(`☄ **Atacar** \t=> ***A*** \n⛄ **Defender** \t=> ***D*** \n💨 **Esquivar** \t=> ***E***`)
                .addField('❄ Acción ❄', 'Deberás poner la letra corresponiente a la opción de arriba que deseas ejecutar (_puedes ponerla en mayusculas o minusculas_).')
                .addField('☄ Atacar ☄', 'Hace 1 pto de daño al enemigo.\nTiene 15% de fallar.')
                .addField('⛄ Defender ⛄', 'Si el enemigo te ataca, solo te hará 0.5 ptos de daño.')
                .addField('💨 Esquivar 💨', 'Evitas el daño enemigo.\nTiene 30% de fallar.')
                .addField('Tips', 'Si no has seleccionado ninguna acción, harás la acción anterior o en caso contrario defender.' +
                '\nSolo puedes esquivar 2 veces seguidas.' + 
                '\nSi no haces ninguna acción durante 3 turnos, pierdes la partida');
            await message.channel.send(fightEmbed)
        }

        if (command === "clear" && message.member.hasPermission("ADMINISTRATOR") || message.author.id === "") {
            if (!game.tiene(`${message.channel.id}`))
                return message.channel.send("No hay ninguna pelea iniciada!");
            await game.eliminar(`${message.channel.id}`).then(() => {
                return message.channel.send("Pelea eliminada correctamente!")
            })
        }
        
    }
}

async function startGame(message) {

    let player1 = new Player();
    let player2 = new Player();
    player1.newPlayer();
    player2.newPlayer();

    player1.name = await game.obtener(`${message.channel.id}.player1.name`).catch(err => console.log(err));
    player1.id = await game.obtener(`${message.channel.id}.player1.id`).catch(err => console.log(err));
    player2.name = await game.obtener(`${message.channel.id}.player2.name`).catch(err => console.log(err));
    player2.id = await game.obtener(`${message.channel.id}.player2.id`).catch(err => console.log(err));

    message.channel.send(`❄ <@${player1.id}> ❄ vs ❄ <@${player2.id}> ❄\nPreparense, la pelea está a punto de empezar`)

    const filter = m => m.author.id === player1.id || m.author.id === player2.id;

    const ronda = setInterval(() => {
        if (player1.getVida() <= 0 || player2.getVida() <= 0) {
            let finEmbed = new Discord.RichEmbed()
                .setTitle("Pelea de bolas de nieve")
                .setColor("#d0d0ff")
                .addField(player1.name, `Anterior acción: ${player1.getAccion()}\n♥ Vida: ${player1.getVida()}\nTurnos perdidos: ${player1.getTaunt()}`, true)
                .addField(player2.name, `Anterior acción: ${player2.getAccion()}\n♥ Vida: ${player2.getVida()}\nTurnos perdidos: ${player2.getTaunt()}`, true);
            if (player1.getVida() <= 0 && player2.getVida() <= 0) {
                finEmbed.setDescription(`❄ ***EMPATE*** ❄`);
                message.channel.send(finEmbed);
                clearInterval(ronda);
                return
            } else if (player1.getVida() <= 0) {
                finEmbed.setDescription(`❄ ***VICTIORA de ${player2.name}*** ❄`);
                message.channel.send(finEmbed);
                clearInterval(ronda);
                return
            } else if (player2.getVida() <= 0) {
                finEmbed.setDescription(`❄ ***VICTIORA de ${player1.name}*** ❄`);
                message.channel.send(finEmbed);
                clearInterval(ronda);
                return
            }
        }

        let time = 3;

        let fightEmbed = new Discord.RichEmbed()
            .setTitle("Pelea de bolas de nieve")
            .setColor("#d0d0ff")
            .setDescription(`☄ **Atacar** \t=> ***a*** \n⛄ **Defender** \t=> ***d*** \n💨 **Esquivar** \t=> ***e***`)
            .addField(player1.name, `Anterior acción: ${player1.getAccion()}\n♥ Vida: ${player1.getVida()}\nTurnos perdidos: ${player1.getTaunt()}`, true)
            .addField(player2.name, `Anterior acción: ${player2.getAccion()}\n♥ Vida: ${player2.getVida()}\nTurnos perdidos: ${player2.getTaunt()}`, true);
        message.channel.send(fightEmbed)
            .then(() => {

                player1.setAccion("❄");
                player2.setAccion("❄");
                let finRonda = false;
                message.channel.send(`❄ Siguiente ataque en... **${time}** ❄`).then(msg => {
                    let ataque = setInterval(() => {
                        time--;
                        if (time > 0)
                            msg.edit(`❄ Siguiente ataque en... **${time}** ❄`);
                        else {
                            time = 3;
                            message.channel.send("❄**ATACAD!**❄").then(() => {
                                const collector = message.channel.createMessageCollector(filter, {time: 3000});
                                collector.on('end', col => {
                                    col.forEach(msg => {
                                        let player;
                                        msg.author.id === player1.id ? player = player1 : player = player2;
                                        let act = msg.content.toLowerCase();
                                        if (act.includes("a")) {
                                            player.setAction("a");
                                            player.setAccion("☄");
                                        } else if (act.includes("d")) {
                                            player.setAction("d");
                                            player.setAccion("⛄");
                                        } else if (act.includes("e") && player.getEsquivar() < 2) {
                                            player.setAction("e");
                                            player.setAccion("💨");
                                        }

                                    });

                                    doAction(player1, player2);

                                    console.log("Vida 1 == " + player1.getVida() + "\nVida 2 == " + player2.getVida())

                                })
                            });

                            clearInterval(ataque)
                        }

                    }, 1000)

                });
                console.log(finRonda);
                if (finRonda === true) {
                    clearInterval(ronda)
                }
            })
    }, 6000);

    await game.eliminar(`${message.channel.id}`)
}


function doAction(player1, player2) {
    const act1 = player1.getAction();
    const act2 = player2.getAction();
    console.log("act1");
    if (player1.getAccion() === "❄")
        player1.setTaunt();
    else
        player1.taunt = 0;
    
    if (player2.getAccion() === "❄")
        player2.setTaunt();
    else
        player2.taunt = 0;
    
    if (player1.getAccion() === "❄" || player2.getAccion() === "❄")
        return;

    const posiblidades = Math.floor(Math.random() * 100);
    const esquivar = posiblidades > 30;
    const atacar = posiblidades > 15;
    const posiblidades2 = Math.floor(Math.random() * 100);
    const atacar2 = posiblidades2 > 15;
    const defensa = Math.floor(Math.random() * 10) * 2 * 0.1;

    if (act1 === "e")
        player1.esquivar();
    else
        player1.resetEsquivar();

    if (act2 === "e")
        player2.esquivar();
    else
        player2.resetEsquivar();


    if (player1.getTaunt() === 2 || player2.getTaunt() === 2) {
        clearInterval(doAction)
    } else if (act1 === "a") {
        if (act2 === "a") {
            if (atacar)
                player2.damage(2);
            if (atacar2)
                player1.damage(2);
        } else if (act2 === "d") {
            if (atacar)
                player2.damage(1)
        } else if (act2 === "e") {
            if (!esquivar)
                player2.damage(2)
        }
    } else if (act1 === "d") {
        if (act2 === "a")
            player1.damage(1)
    } else if (act1 === "e") {
        if (act2 === "a")
            if (!esquivar)
                player1.damage(2)
    }
}
