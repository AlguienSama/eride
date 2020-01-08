const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name:'random-user',
    alias:['rand-user'],
    description:'Usuario aleatorio entre todos los del server, un rol, o coincidente en letras',
    usage:'random-user [ -role nombre del rol | -letras letras coincidentes]',
    permission:'none',
    type:'misc',

    run: async (message, args) => {

        let option

        args[0] ? option = args.shift().toLowerCase() : option = undefined

        console.log(option)
        console.log(args.join(" "));
        
        if (option === "-role") {
            let rol = [message.guild.roles.find(role => role.name.toLowerCase() === args.join(" ")).members.map(m => m.user)]
            //console.log(role[0].length)
            let user = rol[0]
            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else if (option === "-letras") {
            let user = [message.guild.members.find(member => member.nickname.toLowerCase().includes(args.join(" ")))]

            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else if (option === undefined) {
            let rol = [message.guild.members.map(m => m.user)]
            
            let user = rol[0]
            console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send("<@!"+user[Math.floor(Math.random()*user.length)].id+">")
        } else {
            message.channel.send("Opción incorrecta\n``random-user [ -role nombre del rol | -letras letras coincidentes]``")
        }
    }
}
