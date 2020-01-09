const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name:'change-name',
    alias:['change-username', 'change-nickname'],
    description:'Cambia el apodo de todos los usuarios',
    usage:'random-user <Nuevo apodo> [ -letras letras coincidentes]',
    permission:'admin',
    type:'set',

    run: async (message, args) => {

        let option
        let newNick = args.join(" ").includes("-letras") ? args.join(" ").split("-letras") : args.join(" ")
        newNick = newNick[0].trim()
        args[0] ? option = args.shift().toLowerCase() : option = undefined

        console.log(option)
        console.log(args.join(" "));
        
        // if (option === "-role") {
        //     let rol = [message.guild.roles.find(role => role.name.toLowerCase() === args.join(" ")).members.map(m => m.user)]
        //     //console.log(role[0].length)
        //     let user = rol[0]
        //     console.log(user[Math.floor(Math.random() * user.length)].id)
        //     message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        // } else 
        if (option === "-letras") {
            let users = [message.guild.members.map(m => m.user)]

            users.forEach(u => {
                if (!u.nickname.includes(args.join(" ")))
                    message.guild.members.get(u.id).setNickname
            });
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else if (option === undefined) {
            let rol = [message.guild.members.map(m => m.user)]
            
            let user = rol[0]
            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else {
            message.channel.send("Opción incorrecta\n``change-name [ -letras letras coincidentes ]``")
        }
    }
}
