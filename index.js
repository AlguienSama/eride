// Modulos
const Discord = require("discord.js");
const fs = require("fs");
const db = require("megadb");

const client = new Discord.Client();
client.command = new Discord.Collection();


const Tenor = require("tenorjs").client({
    "Key": "3M3R4IB3WLRO",
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "es_ES",
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});

// Command handler
const commandSet = fs.readdirSync("./cmd/cmdSet").filter(f => f.endsWith(".js"));
for (const fileSet of commandSet) {
    let commandSetting = require(`./cmd/cmdSet/${fileSet}`);
    client.command.set(commandSetting.name, commandSetting);
}

const commandMisc = fs.readdirSync("./cmd/cmdMisc").filter(f => f.endsWith(".js"));
for (const fileMisc of commandMisc) {
    let commandMiscs = require(`./cmd/cmdMisc/${fileMisc}`);
    client.command.set(commandMiscs.name, commandMiscs);
}


const commandNSFW = fs.readdirSync("./cmd/cmdNSFW").filter(f => f.endsWith(".js"));
for (const fileNSFW of commandNSFW) {
    let commandNSFWs = require(`./cmd/cmdNSFW/${fileNSFW}`);
    client.command.set(commandNSFWs.name, commandNSFWs);
}

const commandGacha = fs.readdirSync("./cmd/cmdGacha").filter(f => f.endsWith(".js"));
for (const fileGacha of commandGacha) {
    let commandGachas = require(`./cmd/cmdGacha/${fileGacha}`);
    client.command.set(commandGachas.name, commandGachas)
}

const commandFun = fs.readdirSync("./cmd/cmdFun").filter(f => f.endsWith(".js"));
for (const fileFun of commandFun) {
    let commandFuns = require(`./cmd/cmdFun/${fileFun}`);
    client.command.set(commandFuns.name, commandFuns)
}

const commandGame = fs.readdirSync("./cmd/cmdGame").filter(f => f.endsWith(".js"));
for (const fileGame of commandGame) {
    let commandGames = require(`./cmd/cmdGame/${fileGame}`);
    client.command.set(commandGames.name, commandGames)
}

// Connections
require("./vida.js");


// Exports
const {error} = require("./files/logs.js");
const {success, guildInfo} = require("./files/embeds.js");

// const guildMember = require("./events/guildMember.js");
const {xp} = require("./xp.js");
const {piedritas} = require("./piedritas.js");

const config = require("./.env.json");

// Bases de Datos
let dbprefix = new db.crearDB("prefix");
let blackList = new db.crearDB("blackList");


client.on("ready", async () => {
    console.log("Connected as " + client.user.tag);
});


//joined a server
client.on("guildCreate", async guild => {
    client.guilds.get("662066249202794497").channels.get("663112756148437002").send(await guildInfo(guild, "#92ff92"))
    //Your other stuff like adding to guildArray
});

//removed from a server
client.on("guildDelete", async guild => {
    client.guilds.get("662066249202794497").channels.get("663112756148437002").send(await guildInfo(guild, "#ff9292"))
    //remove from guildArray
});

// Join member server
client.on("guildMemberAdd", async member => {
    client.guilds.get("662066249202794497").channels.get("662066249202794505").send(`Bienvenido ${member}!`)
});

// Join member server
client.on("guildMemberRemove", async member => {
    client.guilds.get("662066249202794497").channels.get("662074776835325954").send(`${member} c fue a la puta`)
});


client.on("message", async message => {
    if (message.guild === undefined) return;
    if (message.author.id === client.user.id) return;
    //if (message.channel.id !== "665657856149684235") return;
    // Configuración del prefijo y comandos

    if (dbprefix.tiene(`${message.guild.id}`)) {
        message.prefix = await dbprefix.obtener(`${message.guild.id}`).catch(err => error(message, "Obtener prefijo DB 001", err));
        // console.log('Prefix DB: '+prefix)
    } else {
        message.prefix = process.env.PREFIX || config.prefix;
        // console.log('Prefix base: '+prefix)
    }

    const args = message.content.slice(message.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    message.Tenor = Tenor;
    message.user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
    //console.log(message.user)
    // Prevención de Bucles y canales
    if (
        message.author === client.user ||
        message.author.bot
    ) {
        return;
    }

    // Para la XP
    // await xp(message);
    await piedritas(message, args);

    // Black List Channels
    let datos;
    if (blackList.tiene(`${message.guild.id}.channels`)) {
        datos = await blackList.obtener(`${message.guild.id}.channels`).catch(err => error(message, "Obtener canales BL 001", err));
        if (datos.includes(message.channel.id)) return
    }

    // Know Prefix
    if (
        message.content.toLowerCase().includes(client.user.id) &&
        message.content.toLowerCase().includes("prefix")
    ) {
        return success(message, "Mi prefijo es ``" + message.prefix + "``");
    }


    //cosasNazis(client, message)
    let cmd = client.command.get(command) || client.command.find(c => c.alias.includes(command));
    if (cmd && message.content.toLowerCase().startsWith(message.prefix)) {
        if (!message.channel.nsfw && cmd.type === "nsfw") return;
        return cmd.run(message, args);
    }

});

// Connect token
client.login(config.token);
