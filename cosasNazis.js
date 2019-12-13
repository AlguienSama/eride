const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

var { error, deny } = require('./logs.js')

module.exports = {
    cosasNazis: async (message, prefix) => {
    }
}