const Discord = require('discord.js')
const Canvas = require('canvas')
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
        
        let userXp = await xp.obtener(`${message.guild.id}.users.${message.user.id}.xp`).catch(err => error(message, "Obtener xp usuario 001", err));

        let basicXp = 155;
        let lvl = 0;
        let restXp = userXp;

        while ( restXp > basicXp ) {
            lvl++;
            restXp-=basicXp;
            basicXp+=basicXp;
        }

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        
        ctx.beginPath()
        ctx.fillStyle = '#969696'
        ctx.rect(0, 0, canvas.width, canvas.height)
        // const background = "#696969";
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'test.png')
        message.channel.send(attachment)

        return message.channel.send(`User: ${message.user.username}\nLevel: ${lvl}\nNext level: ${restXp}/${basicXp}\nTotal ganado: ${userXp}`)

    }
}