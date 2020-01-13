const Discord = require('discord.js')
const db = require('megadb')
const client = new Discord.Client()

module.exports = {
  error: async (message, code, err) => {
    let embedError = await new Discord.RichEmbed()
      .setTitle("ERROR")
      .setColor('#d18538') // Naranja
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField("Server", message.guild.name + " | " + message.guild.id)
      .addField("User", message.author +" | "+ message.author.id)
      .addField("Error", code + '\n' +err)
      .addField("Context", message.content)
      .setTimestamp()
    //message.channel.send(embedError)
    await message.client.guilds.get("662066249202794497").channels.get("665709194015670291").send(embedError)
  },

  deny: async (message)  => {
    let denyError = await new Discord.RichEmbed()
      .setColor('#cf303a') // Rojo
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField('Permiso denegado!', 'Permisos insuficientes para ejecutar este comando')
    
    return message.channel.send(denyError)
  }
  
}