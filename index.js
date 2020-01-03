
// Modulos
const Discord = require("discord.js");
const fs = require("fs");
const db = require("megadb");

const client = new Discord.Client();
client.command = new Discord.Collection();


// Command handler
const commandSet = fs.readdirSync("./cmd/cmdSet").filter(f => f.endsWith(".js"));
for (const fileSet of commandSet) {
  let commandSetting = require(`./cmd/cmdSet/${fileSet}`);
  client.command.set(commandSetting.name, commandSetting);
}

const commandNSFW = fs.readdirSync("./cmd/cmdNSFW").filter(f => f.endsWith(".js"));
for (const fileNSFW of commandNSFW) {
  let commandNSFWs = require(`./cmd/cmdNSFW/${fileNSFW}`);
  client.command.set(commandNSFWs.name, commandNSFWs);
}

const commandGacha = fs.readdirSync("./cmd/cmdGacha").filter(f => f.endsWith(".js"));
for (const fileGacha of commandGacha) {
  let commandGachas = require(`./cmd/cmdGacha/${fileGacha}`);
  client.command.set(commandGachas.name+"@gacha", commandGachas)
}

const commandFun = fs.readdirSync("./cmd/cmdFun").filter(f => f.endsWith(".js"));
for (const fileFun of commandFun) {
  let commandFuns = require(`./cmd/cmdFun/${fileFun}`);
  client.command.set(commandFuns.name+"@fun", commandFuns)
}

const commandGame = fs.readdirSync("./cmd/cmdGame").filter(f => f.endsWith(".js"));
for (const fileGame of commandGame) {
  let commandGames = require(`./cmd/cmdGame/${fileGame}`);
  client.command.set(commandGames.name+"@game", commandGames)
}

// Connections
const vida = require("./vida.js");


// Exports
const { error } = require("./files/logs.js")


// Bases de Datos
let dbprefix = new db.crearDB("prefix");
let blackList = new db.crearDB("blackList");


client.on("ready", async () => {
  console.log("Connected as " + client.user.tag);

  // console.log(client.command);
  
});


client.on("message", async message => {
  if (message.guild === undefined) return;
  //if (message.author.id === client.user.id) return;

  // Configuración del prefijo y comandos

  if (dbprefix.tiene(`${message.guild.id}`)) {
    message.prefix = await dbprefix.obtener(`${message.guild.id}`).catch(err => error(message, "Obtener prefijo DB 001", err));
    // console.log('Prefix DB: '+prefix)
  } else {
    message.prefix = process.env.PREFIX;
    // console.log('Prefix base: '+prefix)
  }
  
  const args = message.content.slice(message.prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
  

  // Know Prefix
  if (
    message.content.toLowerCase().includes(client.user.id) &&
    message.content.toLowerCase().includes("prefix")
  ) {
    return message.channel.send("Mi prefijo es ``" + message.prefix + "``");
  }

  // Black List Channels
  let datos;
  if (blackList.tiene(`${message.guild.id}.channels`)) {
    datos = await blackList.obtener(`${message.guild.id}.channels`).catch(err => error(message, "Obtener canales BL 001", err));
    if (datos.includes(message.channel.id)) return
  }

  // Prevención de Bucles y canales
  /*if (
    message.author == client.user ||
    message.author.bot
  ) {
    return;
  }*/
  
  //cosasNazis(client, message)
  let cmd = client.command.get(command) || client.command.find(c => c.alias.includes(command));
  if (cmd && message.content.toLowerCase().startsWith(message.prefix)) {
    // let alias = cmd.alias;
    console.log("a")
    // let name = cmd.name;
    // let description = cmd.description;
    // console.log(alias, name, description)
    return cmd.run(message, args);
  }

});

// Connect token
let bot_token = process.env.TOKEN;
client.login(bot_token);
