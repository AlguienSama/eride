const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("megadb");
let poll = new db.crearDB("polls");

var { error, deny } = require("../../logs.js");

module.exports = {
  name: "make",
  alias: ["test"],
  description: "Crear una nueva poll personalizada",
  usage: "``createpoll``",

  run: async (message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return deny(message);

    let embed = new Discord.RichEmbed().setTitle("¡Colector!").setDescription(`
¿Quieres un dulce?

Reacciona con \`✅\` para aceptar el dulce.
Reacciona con \`❌\` para denegar el dulce.
`);

    let enviado = await message.channel.send({ embed }); // Enviamos el mensaje.

    /* Pondremos para que el bot reaccione. */
    await enviado.react("✅");
    await enviado.react("❌");
  
    const aceptarFiltro = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    const denegarFiltro = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
    
    const aceptar = enviado.createReactionCollector(aceptarFiltro, {time: 60000}); 
    const denegar = enviado.createReactionCollector(denegarFiltro, {time: 60000}); // Colocamos el filtro que creamos arriba y ponemos un tiempo de 60000 ms (un minuto).
    
    aceptar.on('collector', async r => {
      await message.channel.send('Bien, ' + message.author.tag + '. Toma tu dulce. 🍬') // Aquí solo mando un mensaje, pero se pueden poner más cosas como agregar un rol, cambiar permisos, etc...
    })
    denegar.on('collector', async r => {
      await message.channel.send('Me deprimes, te juro que mis dulces no contienen sustancias. 😭') // Al igual que con el de arriba, se pueden poner otras cosas aparte de enviar un mensaje.
    })
  }
  
};
