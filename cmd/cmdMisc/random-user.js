const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name:'random-user',
    alias:['rand-user'],
    description:'Usuario aleatorio entre todos los del server, un rol, o coincidente en letras',
    usage:'random-user [ -role nombre del rol | -letras letras coincidentes]',
    permission:'none',
    type:'set',

    run: async (message, args) => {

        // let role = message.guild.roles.find("name", args.slice(1).join(" ")).members.map(m => m.user)

        // 

    }
}