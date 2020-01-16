const Discord = require('discord.js');

module.exports = {
    name: '!say',
    alias: [],
    description: 'Repite el mensaje escrito y elimina el mensaje del usuario',
    usage: 'say <argumentos>',
    permission: 'none',
    type: 'fun',

    run: (message, args) => {

        if (message.mentions.channels.first() && message.member.hasPermission("MANAGE_MESSAGES")) {
            message.mentions.channels.first().send(args.slice(1).join(" "))
        } else {
            message.channel.send(args.join(" "))
        }

    }
};