const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('megadb');
let poll = new db.crearDB('gachas');

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name: 'addcard',
    alias: ['newcard'],
    description: 'Añadir una nueva carta personalizada',
    usage: 'addcard',
    permission:'Administrador',
    type:'gacha',

    run: async (message, args) => {

        admin(message)

        if (!poll.tiene(`${message.guild.id}.polls`))
            return message.channel.send('Debes crear una poll ``' + message.prefix + 'createPoll``');

        const rank = await poll.obtener(`${message.guild.id}.rank`);
        const polls = await poll.obtener(`${message.guild.id}.polls`);

        let addCardEmbed = new Discord.RichEmbed()
            .setTitle("Sigue las proximas instrucciones")
            .setColor("#f9f547")
            .setTimestamp();

        let totalKeys = 0;
        polls.forEach(pollCmd => {
            pollCmd.forEach(async pollName => {
                const images = await poll.keys(`${message.guild.id}.polls.${pollCmd}.${pollName}`);
                addCardEmbed.addField(pollName, `Command: ${pollCmd}\nNúm imgs: ${images}`);
                totalKeys = totalKeys + images;
            })
        });

        addCardEmbed.setFooter("Imagenes totales: " + totalKeys);

        if (rank === "Normal" && totalKeys >= 50 || rank === "VIP" && totalKeys >= 100) {
            return message.channel.send("Máximo de imagenes llegado")
        }

        message.channel.send(addCardEmbed);

        message.channel.send("Escribe el nombre de la colección a la que le desea agregar la carta");

        const filter = msg => {
            msg.author.id === message.author.id;
            polls.forEach(pollCmd => {
                poll.tiene(`${message.guild.id}.polls.${pollCmd}.${msg.content}`)
            })
        };
        const collector = new Discord.MessageCollector(message.channel, filter, {max: 1, time: 30000});

        collector.on('collect', async msgCol => {
            addCardEmbed.setAuthor(msgCol.content);
            await message.channel.send(addCardEmbed);
            message.channel.send("Escribe el nombre de la carta");
            const collector2 = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
                max: 1,
                time: 30000
            });

            collector2.on("collect", async msgName => {
                addCardEmbed.setTitle(msgName.content);
                await message.channel.send(addCardEmbed);
                message.channel.send("Escribe la descripción de la carta");
                const collector3 = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                });

                collector3.on("collect", async msgDesc => {

                    addCardEmbed.setDescription(msgDesc.content);
                    await message.channel.send(addCardEmbed);
                    message.channel.send("Envia la URL de la imagen");

                    const collector4 = new Discord.MessageCollector(message.channel, msg => msg.author.id === message.author.id, {
                        max: 1,
                        time: 30000
                    });

                    collector4.on("collect", async msgImg => {

                        addCardEmbed.setImage(msgImg.content);
                        await message.channel.send(addCardEmbed);
                        message.channel.send("Pon una probabilidad del 1 al 10 (siendo 1 la menor probabilidad)");

                        const filter2 = msg => {
                            msg.author.id === message.author.id;
                            parseInt(msg.content) > 0;
                            parseInt(msg.content) < 11;
                        };

                        const collector5 = new Discord.MessageCollector(message.channel, filter2, {
                            max: 1,
                            time: 30000
                        });

                        collector5.on("collect", async msgProb => {
                            addCardEmbed.setFooter("Imagenes totales: " + totalKeys + " | Probabilidad: " + msgProb.content)
                            message.channel.send(addCardEmbed)
                                message.channel.send("Reacciona a <:firefoxBlue:650668928275841025> para aceptar o <:firefoxRed:650668882994135051> para cancelar").then( async mensaje => {
                                const filter = (reaction, user) => {
                                    return (reaction.emoji.name === "firefoxRed" || reaction.emoji.name === "firefoxBlue") && user.id === message.author.id;
                                };

                                const card = mensaje.createReactionCollector(filter, { max: 1 });

                                card.on('collect', async (reaction) => {
                                    if (reaction.emoji.name === "firefoxRed") {
                                        return message.channel.send("Creación de carta cancelada")
                                    } else if (reaction.emoji.name === "firefoxBlue") {
                                        await poll.establecer(`${message.guild.id}.polls.`)
                                    }
                                });

                                await mensaje.react("650668928275841025").catch(err => error(mensaje, "Reaction createPoll 02 => ", err));
                                await mensaje.react("650668882994135051").catch(err => error(mensaje, "Reaction createPoll 01 => ", err));
                            })
                        })
                    })
                })
            })
        });

    }
};