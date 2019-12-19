const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let poll = new db.crearDB('polls')

var { error, deny } = require('../../logs.js')

module.exports = {
    name:'addcard',
    alias:['newcard'],
    description:'Añadir una nueva carta personalizada',
    usage:'``addcard``',
  
    run: async (message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        if (!poll.tiene(`${message.guild.id}.polls`))
            return message.channel.send('Debes crear una poll ``'+ message.prefix+'createPoll``')

        const rank = await poll.obtener(`${message.guild.id}.rank`);
        const polls = await poll.obtener(`${message.guild.id}.polls`);

        let addCardEmbed = new Discord.RichEmbed()
            .setTitle("Añadir carta")
            .addField("Como añadir una carta?", message.prefix + "``addcard <pollName> <url img>``")
            .setColor("")
            .setTimestamp()

        let totalKeys = 0;
        polls.forEach(pollCmd => {
            pollCmd.forEach(async pollName => {
                const images = await poll.keys(`${message.guild.id}.polls.${pollCmd}.${pollName}`);
                addCardEmbed.addField(pollName, `Command: ${pollCmd}\nNúm imgs: ${images}`)
                totalKeys = totalKeys + images;
            })
        });

        addCardEmbed.setFooter("Imagenes totales: " + totalKeys)

        if (rank == "Normal" && totalKeys >= 50 || rank == "VIP" && totalKeys >= 100) {
            return message.channel.send("Máximo de imagenes llegado")
        }

        if (!args[0])
            return message.channel.send(addCardEmbed)

        let name = args.join(" ").split(args.length -1)
        console.log(name)
        // let selectPollEmbed = new Discord.RichEmbed()
        //     .setTitle("Añadir imagen")
        //     .setDescription("Introduce el número de la colección que desea añadir la imagen")
        // let num = 1;
        // polls.forEach(async pollCmd => {
        //     pollCmd.forEach(async pollName => {
        //         selectPollEmbed.addField(`${num})`, pollName)
        //     })
        // });
                  
    }
}