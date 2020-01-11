const Discord = require('discord.js')
const db = require('megadb')
let xp = new db.crearDB('xp')

const { error } = require('../../files/logs.js');
const { admin } = require('../../files/perm.js');

module.exports = {
    name:'xp',
    alias:['level'],
    description:'Ver la experiencia ganada\n',
    usage:'xp [ usuario ]',
    permission:'nonce',
    type:'xp',
  
    run: async (message, args) => {
        
        let userXp = await xp.obtener(`${message.guild.id}.users.${message.author.id}.xp`).catch(err => error(message, "Obtener xp usuario 001", err));

        let level = userXp / 3

        return message.channel.send(userXp)

    }
}