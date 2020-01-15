const Discord = require('discord.js')
const db = require('megadb')
let dbprefix = new db.crearDB('prefix')

const { error } = require('../../files/logs.js');
const { admin, patreon, patreonB } = require('../../files/perm.js');

module.exports = {
    name:'prefix',
    alias:[],
    description:'Cambiar el prefijo',
    usage:'prefix <new prefix>',
    permission:'Administrador',
    type:'set',
  
    run: async (message, args) => {
        let perm;
        await patreonB(message).then(async pat => {
            if (!pat) {
                perm = false;
                return await patreon(message)
            }
        })
      
        if (!perm)
          return
        
        if (!args[0])
            return message.channel.send("Debes introducir el nuevo prefijo\n``prefix <new prefix>``")

        let pr = args.join(' ')
        dbprefix.establecer(`${message.guild.id}`, pr)
        return message.channel.send(`Prefijo cambiado correctamente a \`\`${pr}\`\``)
    }
}