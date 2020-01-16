const Discord = require('discord.js');
const db = require('megadb');
let xp = new db.crearDB('xp');

const { error } = require('../../files/logs.js');
const { patreon, patreonB } = require('../../files/perm.js');

module.exports = {
    name:'xp-img',
    alias:[],
    description:'Añadir imagen en el banner de XP (Tamaño recomendable 700px x 250px)\nLa url debe terminar en .png .jpg o similares',
    usage:'xp-img < url >',
    permission:'Patreon',
    type:'xp',
  
    run: async (message, args) => {
        
        await patreonB(message).then(async pat => {
            if (!pat) {
                return await patreon(message)
            } else {
                if (!args[0])
                    return message.channel.send("Comando mal introducido: ``xp-img < url >``\nLa url debe terminar en .png .jpg o similares");

                xp.establecer(`patreon.${message.user.id}.img`, args[0]).then(() => {
                    return message.channel.send("Imagen agregada correctamente")
                }).catch((err) => {
                    return error(message, "Agregar banner XP",err);
                });
            }
        })
    }
};