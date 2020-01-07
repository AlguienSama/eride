const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name:'random-user',
    alias:['rand-user'],
    description:'Usuario aleatorio entre todos los del server, un rol, o coincidente en letras',
    usage:'random-user [ role nombre del rol | letras letras coincidentes]',
    permission:'none',
    type:'set',

    run: async (message, args) => {

        let option = args.shift().toLowerCase()

        console.log(option)
        console.log(args.join(" "));
        
        if (option === "role") {
            let rol = [message.guild.roles.find(role => role.name.toLowerCase() === args.join(" ")).members.map(m => m.user)]
            //console.log(role[0].length)
            user = rol[0]
            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else if (option === "nick") {
            let user = [message.guild.members.find(member => member.nickname.toLowerCase().includes(args.join(" ")))]

            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else {
            let rol = [message.guild.roles.find(role => role.name.toLowerCase() === everyone).members.map(m => m.user)]
            
            user = rol[0]
            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        }
    }
}
