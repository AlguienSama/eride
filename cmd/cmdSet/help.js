const Discord = require('discord.js')
const fs = require("fs");

var { deny } = require('../../files/logs.js')

module.exports = {
    name:'help',
    alias:[],
    description:'Ver ayuda',
    usage:'``help [categoria]``',
    permission:'none',
    type:'set',
  
    run: async (message, args) => {

        // if (!args[0]){
        //     helpEmbed.setDescription("Help list | Categorias\n``help <nombre categoria>``")
        //     .addField("Fun | Misc", "Para entretenimiento")
        //     .addField("Meme", "Hacer memes")
        //     .addField("Amor", "Comandos de amor")
        //     .addField("Setting | Config", "Para configurarme")
        //     return message.channel.send(helpEmbed)
        // }

        let cmd = args.join(" ").toLowerCase()
        let cmdFun = ["fun", "misc"]
        let cmdMeme = ["meme"]
        let cmdSet = ["set", "conf"]
        let cmdMod = ["amor"]
        let cmdNSFW = ["hentai", "nsfw"]
        

        if (cmdFun.some(m => cmd.includes(m.toLowerCase())) || !args) {
            helpEmbedFun = new Discrd.RichEmbed()
                .setColor('#87f9f4')
                .setDescription("Help list | Fun\n``help <nombre comando>``")
            if (args) 
                helpEmbedSet.setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional")

            const commandFun = fs.readdirSync("/app/cmd/cmdFun").filter(f => f.endsWith(".js"));
            for (const fileFun of commandFun) {                
                let command = require(`/app/cmd/cmdFun/${fileFun}`);
                let alias = command.alias.length != 0 ? "\nAlias: " + command.alias.join(" ") : " "
                helpEmbed.addField("Command: "+ command.name, 
                command.description +
                "\nUso: "+ command.usage +" "+ alias)
            }
            message.author.send(helpEmbedFun)
        }

        // else if (cmdMeme.some(m => cmd.includes(m.toLowerCase()))) {
        //     helpEmbed.setDescription("Help list | Meme\n``help <nombre comando>``")
        //     const commandMeme = fs.readdirSync("/app/cmd/cmdMeme").filter(f => f.endsWith(".js"));
        //     for (const fileMeme of commandMeme) {
        //         let command = require(`/app/cmd/cmdMeme/${fileMeme}`);
        //         let alias = command.alias.length != 0 ? "\nAlias: " + command.alias.join(" ") : " "
        //         helpEmbed.addField("Command: "+ command.name, 
        //         command.description +
        //         "\nUso: "+ command.usage +" "+ alias)
        //     }
        // }

        if (cmdSet.some(m => cmd.includes(m.toLowerCase())) || !args) {
            helpEmbedSet = new Discord.RichEmbed()
                .setColor('#ffc441')
                .setDescription("Help list | Settings\n``help <nombre comando>``")
            if (args) 
                helpEmbedSet.setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional")
            
                const commandSet = fs.readdirSync("/app/cmd/cmdSet").filter(f => f.endsWith(".js"));
            for (const fileSet of commandSet) {
                let command = require(`/app/cmd/cmdSet/${fileSet}`);
                let alias = command.alias.length != 0 ? "\nAlias: " + command.alias.join(" ") : " "
                helpEmbed.addField("Command: "+ command.name, 
                command.description +
                "\nUso: "+ command.usage +" "+ alias)
            }
            message.author.send(helpEmbedSet)
        }

        // if (cmdMod.some(m => cmd.includes(m.toLowerCase()))) {
        //     helpEmbed.setDescription("Help list | Amor\n``help <nombre comando>``")
        //     const commandMod = fs.readdirSync("/app/cmd/cmdMod").filter(f => f.endsWith(".js"));
        //     for (const fileMod of commandMod) {
        //         let command = require(`/app/cmd/cmdMod/${fileMod}`);
        //         let alias = command.alias.length != 0 ? "\nAlias: " + command.alias.join(" ") : " "
        //         helpEmbed.addField("Command: "+ command.name, 
        //         command.description +
        //         "\nUso: "+ command.usage +" "+ alias)
        //     }
        // }

        if (cmdNSFW.some(m => cmd.includes(m.toLowerCase())) || !args) {
            let helpEmbed1 = new Discord.RichEmbed()
                .setColor("#1fff5a")
            let helpEmbed2 = new Discord.RichEmbed()
                .setColor("#1fff5a")
                .setFooter("No se debe de poner los <> | []\n<> Campo obligatorio\n[] Campo opcional")
            //let helpEmbed3 = new helpEmbed
            helpEmbed1.setDescription("Help list | Hentai NSFW\n``help <nombre comando>``")
            const commandNSFW = fs.readdirSync("/app/cmd/cmdNSFW").filter(f => f.endsWith(".js"));
            let times = 1;
            for (const fileNSFW of commandNSFW) {       
                times++;         
                let command = require(`/app/cmd/cmdNSFW/${fileNSFW}`);
                let alias = command.alias.length != 0 ? "\nAlias: " + command.alias.join(" ") : " "
                if (times < 20) {
                    helpEmbed1.addField("Command: "+ command.name, 
                    command.description +
                    "\nUso: "+ command.usage +" "+ alias)
                } else if (times < 40) {
                    helpEmbed2.addField("Command: "+ command.name, 
                    command.description +
                    "\nUso: "+ command.usage +" "+ alias)
                }
            }
            message.author.send(helpEmbed1)
            message.author.send(helpEmbed2)
        }

        
        return

        
    }
}