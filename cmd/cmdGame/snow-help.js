const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let game = new db.crearDB('games')

const {error, deny} = require('../../files/logs.js');

module.exports = {
    name:'snow-help',
    alias:['sn-he'],
    description:'Información sobre el juego snow',
    usage:'snow-help',
    permission:'none',
  
    run: async (message, args) => {
        
        let fightEmbed = new Discord.RichEmbed()
            .setTitle("❄️ Pelea de bolas de nieve ❄️")
            .setColor("#d0d0ff")
            .setDescription(`☄ **Atacar** \t=> ***A*** \n⛄ **Defender** \t=> ***D*** \n💨 **Esquivar** \t=> ***E***`)
            .addField('❄️ Acción ❄️', 'Deberás poner la letra corresponiente a la opción de arriba que deseas ejecutar (_puedes ponerla en mayusculas o minusculas_).')
            .addField('☄️ Atacar ☄️', 'Hace 2 ptos de daño al enemigo.\nTiene 15% de fallar.')
            .addField('⛄ Defender ⛄', 'Evitas la mitad del daño enemigo (1 pto).')
            .addField('💨 Esquivar 💨', 'Evitas el daño enemigo.\nTiene 30% de fallar.')
            .addField('🌨️ Tips 🌨️', 'Si no seleccionas ninguna acción 3 veces seguidas, pierdes.');
        await message.channel.send(fightEmbed)

    }
}