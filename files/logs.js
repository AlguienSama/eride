const Discord = require('discord.js');

module.exports = {
  error: async (message, code, err) => {
    let embedError = await new Discord.RichEmbed()
      .setTitle("ERROR")
      .setColor('#d18538')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField("Server", message.guild.name + " | " + message.guild.id)
      .addField("User", message.author +" | "+ message.author.id)
      .addField("Error", code + '\n' +err)
      .addField("Context", message.content)
      .setTimestamp();

    await message.client.guilds.get("662066249202794497").channels.get("665709194015670291").send(embedError)
  },

  deny: async (message)  => {
    let denyError = await new Discord.RichEmbed()
      .setColor('#cf303a')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField('Permiso denegado!', 'Permisos insuficientes para ejecutar este comando');
    
    return message.channel.send(denyError)
  }
  
};