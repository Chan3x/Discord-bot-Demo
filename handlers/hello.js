module.exports = hello = (msg) => {
    // const sayHello = new Discord.RichEmbed()
    // .addField('**hello !**', message.author.username)
    // .setColor("#FFD300")

  msg.channel.send(`**hello !** <@${msg.author.id}>`)
  // console.log(message.author)
}