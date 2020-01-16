const Discord = require('discord.js');

module.exports = {
    name: 'num-users',
    alias: ['total-users'],
    description: 'Número de usuarios',
    usage: 'num-users [ -role nombre del rol | -letras letras coincidentes]',
    permission: 'none',
    type: 'misc',

    run: async (message, args) => {

        /*let option;

        args[0] ? option = args.shift().toLowerCase() : option = undefined;

        let user;
        if (option === "-role") {
            return;
            let rol = [message.guild.roles.find(role => role.name.toLowerCase() === args.join(" ")).members.map(m => m.user)];
            //console.log(role[0].length)
            let user = rol[0];
            console.log(user[Math.floor(Math.random() * user.length)].id);
            message.channel.send("<@!" + user[Math.floor(Math.random() * user.length)].id + ">")
        } else if (option === "-nick") {
            return;
            let user = message.guild.members.find(member => member.nickname.toLowerCase().includes(args.join(" "))).members.map(m => m.nickname).join("\n");

            //console.log(user[Math.floor(Math.random() * user.length)].id)
            message.channel.send(user)
        } else if (option === undefined) {
            return;
            let rol = [message.guild.members.map(m => m.user)];

            user = rol[0];
            console.log(user[Math.floor(Math.random() * user.length)].id);
            message.channel.send("<@!" + user[Math.floor(Math.random() * user.length)].id + ">")
        } else {
            return;
            message.channel.send("Opción incorrecta\n``random-user [ -role nombre del rol | -letras letras coincidentes]``");
        }*/
    }
};
