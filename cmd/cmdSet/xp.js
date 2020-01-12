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
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(10,10,10,1)';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(130,32,38,0.67)';
        ctx.fillRect(20, 20, canvas.width-40, canvas.height-40);
        

        // Username
        ctx.font = applyText(canvas, message.user.tag);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(message.user.tag, canvas.width / 2.5, canvas.height / 1.8);


        // Avatar
        ctx.beginPath();
        ctx.arc(125, 125, 90, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(message.user.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);


        const attachment = new Discord.Attachment(canvas.toBuffer(), 'test.gif');
        await message.channel.send(attachment);

        return message.channel.send(`User: ${message.user.username}\nLevel: ${lvl}\nNext level: ${restXp}/${basicXp}\nTotal ganado: ${userXp}`)

    }
};

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};