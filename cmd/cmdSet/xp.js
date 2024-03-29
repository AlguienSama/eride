const Discord = require('discord.js');
const Canvas = require('canvas');
const db = require('megadb');
let xp = new db.crearDB('xp');

const {error} = require('../../files/logs.js');

module.exports = {
    name: 'xp',
    alias: ['level'],
    description: 'Ver la experiencia ganada\n',
    usage: 'xp [ usuario ]',
    permission: 'nonce',
    type: 'xp',

    run: async (message, args) => {

        if (!xp.tiene(`${message.guild.id}.users.${message.user.id}`))
            message.user = message.author;

        let userXp = await xp.obtener(`${message.guild.id}.users.${message.user.id}.xp`).catch(err => error(message, "Obtener xp usuario 001", err));

        let basicXp = 155;
        let lvl = 0;
        let restXp = userXp;

        while (restXp > basicXp) {
            lvl++;
            restXp -= basicXp;
            basicXp += basicXp;
        }

        let restXpString = numLetter(restXp);
        let basicXpString = numLetter(basicXp);

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        // Rect background
        if (xp.tiene(`patreon.${message.user.id}.img`)) {

            const background = await Canvas.loadImage(await xp.obtener(`patreon.${message.user.id}.img`).catch(err => error(message, "Cargar imagen patreon XP 001", err)));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        } else {

            ctx.fillStyle = '#2d2f35';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(10,10,10,1)';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

        }

        ctx.fillStyle = 'rgba(17,18,22,0.80)';
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        ctx.strokeStyle = 'rgba(10,10,10,0.80)';
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Username
        ctx.font = applyText(canvas, message.user.tag);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(message.user.tag, canvas.width / 3, canvas.height / 3);

        // Level
        ctx.font = `bold 30px verdana`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`LVL: ${lvl}`, canvas.width / 1.35, canvas.height / 3);

        // Progress Bar
        roundedRect(ctx, 240, 180, 400, 30, 20);
        ctx.fillStyle = 'rgba(50,50,50,1)';
        ctx.fill();

        // Progress Level
        /*
        basicXp = 100%
        restXp  = x%

        400 = 100
        x   = y
        */
        let lastXp = (100 * restXp) / basicXp;

        roundedRect(ctx, 240, 180, lastXp * 4, 30, 20);
        ctx.fillStyle = 'rgba(150,150,150,1)';
        ctx.fill();

        ctx.font = `bold 25px verdana`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${restXpString}/${basicXpString}`, 500, 160);

        ctx.font = `bold 25px verdana`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${parseInt(lastXp)}%`, 420, 204);

        // Avatar
        ctx.beginPath();
        ctx.arc(125, 125, 90, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(message.user.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'level-info.png');
        return await message.channel.send(attachment);
    }
};

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = "35";

    do {
        ctx.font = `bold ${fontSize -= 1}px verdana`;
    } while (ctx.measureText(text).width > canvas.width - 425);

    return ctx.font;
};

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
}

function numLetter(num) {
    let conv;
    if (num > 999999) {
        conv = (num) => String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        let final = conv(num).split(".");
        return final[0] + '.' + final[1].slice(0, 2) + 'M';

    } else if (num > 999) {
        conv = (num) => String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        let final = conv(num).split(".");
        return final[0] + '.' + final[1].slice(0, 2) + 'K';
    }

    return num;
}