const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
    name: 'help',
    alias: [],
    description: 'Ver ayuda',
    usage: '``help [categoria]``',
    permission: 'none',
    type: 'set',

    run: async (message, args) => {

        // if (!args[0]){
        //     helpEmbed.setDescription("Help list | Categorias\n``help <nombre categoria>``")
        //     .addField("Fun | Misc", "Para entretenimiento")
        //     .addField("Meme", "Hacer memes")
        //     .addField("Amor", "Comandos de amor")
        //     .addField("Setting | Config", "Para configurarme")
        //     return message.channel.send(helpEmbed)
        // }

        let cmd = args.join(" ").toLowerCase();
        let cmdFun = ["fun"];
        let cmdSet = ["set", "conf"];
        let cmdMisc = ["misc", "rand"];
        let cmdNSFW = ["hentai", "nsfw"];


        if (cmdFun.some(m => cmd.includes(m.toLowerCase())) || !args) {
            let helpEmbedFun = new Discord.RichEmbed()
                .setColor('#87f9f4')
                .setDescription("Help list | Fun\n``help <nombre comando>``");
            if (args)
                helpEmbedFun.setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional");

            const commandFun = fs.readdirSync("/app/cmd/cmdFun").filter(f => f.endsWith(".js"));
            for (const fileFun of commandFun) {
                let command = require(`/app/cmd/cmdFun/${fileFun}`);
                let alias = command.alias.length !== 0 ? "\nAlias: " + command.alias.join(" ") : " ";

                helpEmbedFun.addField("Command: " + command.name,
                    command.description +
                    "\nUso: " + command.usage + " " + alias)
            }

            await message.author.send(helpEmbedFun)
        }

        if (cmdMisc.some(m => cmd.includes(m.toLowerCase())) || !args) {
            let helpEmbedMisc = new Discord.RichEmbed()
                .setColor("#bdabff")
                .setDescription("Help list | Miscelania\n``help <nombre comando>``");
            if (args)
                helpEmbedMisc.setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional");

            const commandMisc = fs.readdirSync("/app/cmd/cmdMisc").filter(f => f.endsWith(".js"));
            for (const fileMisc of commandMisc) {
                let command = require(`/app/cmd/cmdMisc/${fileMisc}`);
                let alias = command.alias.length !== 0 ? "\nAlias: " + command.alias.join(" ") : " ";
                helpEmbedMisc.addField("Command: " + command.name,
                    command.description +
                    "\nUso: " + command.usage + " " + alias)
            }
            await message.author.send(helpEmbedMisc)
        }

        if (cmdSet.some(m => cmd.includes(m.toLowerCase())) || !args) {
            let helpEmbedSet = new Discord.RichEmbed()
                .setColor('#ffc441')
                .setDescription("Help list | Settings\n``help <nombre comando>``");
            if (args)
                helpEmbedSet.setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional");

            const commandSet = fs.readdirSync("/app/cmd/cmdSet").filter(f => f.endsWith(".js"));
            for (const fileSet of commandSet) {
                let command = require(`/app/cmd/cmdSet/${fileSet}`);
                let alias = command.alias.length !== 0 ? "\nAlias: " + command.alias.join(" ") : " ";
                helpEmbedSet.addField("Command: " + command.name,
                    command.description +
                    "\nUso: " + command.usage + " " + alias)
            }
            await message.author.send(helpEmbedSet)
        }

        if (cmdNSFW.some(m => cmd.includes(m.toLowerCase())) || !args) {
            let helpEmbed1 = new Discord.RichEmbed()
                .setColor("#1fff5a");
            let helpEmbed2 = new Discord.RichEmbed()
                .setColor("#1fff5a")
                .setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional");
            //let helpEmbed3 = new helpEmbed
            helpEmbed1.setDescription("Help list | Hentai NSFW\n``help <nombre comando>``");
            const commandNSFW = fs.readdirSync("/app/cmd/cmdNSFW").filter(f => f.endsWith(".js"));
            let times = 1;
            for (const fileNSFW of commandNSFW) {
                times++;
                let command = require(`/app/cmd/cmdNSFW/${fileNSFW}`);
                let alias = command.alias.length !== 0 ? "\nAlias: " + command.alias.join(" ") : " ";
                if (times < 20) {
                    helpEmbed1.addField("Command: " + command.name,
                        command.description +
                        "\nUso: " + command.usage + " " + alias)
                } else if (times < 40) {
                    helpEmbed2.addField("Command: " + command.name,
                        command.description +
                        "\nUso: " + command.usage + " " + alias)
                }
            }
            await message.author.send(helpEmbed1);
            await message.author.send(helpEmbed2)
        }
    }
};