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

        // Rect background
        ctx.fillStyle = '#2d2f35';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.strokeStyle = 'rgba(10,10,10,1)';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(130,32,38,0.67)';
        ctx.rect(120, 120, canvas.width, canvas.height);
        ctx.fill();
        

        // Avatar
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(message.user.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'test.png');
        await message.channel.send(attachment);

        return message.channel.send(`User: ${message.user.username}\nLevel: ${lvl}\nNext level: ${restXp}/${basicXp}\nTotal ganado: ${userXp}`)

    }
};