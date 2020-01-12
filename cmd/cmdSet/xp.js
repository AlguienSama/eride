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

        ctx.fillStyle = '#2d2f35';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        ctx.fillStyle = 'rgba(30,32,38,0.67)';
        ctx.rect(20, 20, canvas.width-20, canvas.height-20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(10,10,10,1)';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(30, 30, 190, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Ca
        // const background = "#696969";
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'test.png');
        await message.channel.send(attachment);

        return message.channel.send(`User: ${message.user.username}\nLevel: ${lvl}\nNext level: ${restXp}/${basicXp}\nTotal ganado: ${userXp}`)

    }
};