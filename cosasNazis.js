const Discord = require('discord.js')
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('./logs.js')

module.exports = {
    // cosasNazis: async (client, message, prefix) => {

    //     const filter = m => m.author.id == a || m.author.id == a;

    //     client.users.get("355104003572498435").send("Hola")
    //     .then(() => {
    //         message.channel.awaitMessages(filter, { time: 3000 })
    //         .then(collected => {
    //             console.log(collected)
    //         })
    //     })
    // }
}