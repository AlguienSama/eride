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
  
    const aceptarFiltro = (reaction, user) => {
      console.log(reaction.collection)
      reaction.emoji.name === '✅' && user.id === message.author.id
    }
    const denegarFiltro = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
    
    enviado.awaitReactions(aceptarFiltro, {time: 10000, errors: ['time']})
      .then(collected => console.log("B"))
      .catch(collected => console.log("G"))
    
    enviado.awaitReactions(denegarFiltro, {time: 10000, errors: ['time']})
      .then(collected => console.log("A"))
      .catch(collected => console.log("F"))
    
    /*aceptar.on('collector', async r => {
      await message.channel.send('Bien, ' + message.author.tag + '. Toma tu dulce. 🍬') // Aquí solo mando un mensaje, pero se pueden poner más cosas como agregar un rol, cambiar permisos, etc...
    })
    denegar.on('collector', async r => {
      await message.channel.send('Me deprimes, te juro que mis dulces no contienen sustancias. 😭') // Al igual que con el de arriba, se pueden poner otras cosas aparte de enviar un mensaje.
    })*/
  }
  
};
