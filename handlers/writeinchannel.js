const Discord = require('discord.js')
module.exports = writeInChannel = (msg, bot) => {
    const msgArray = msg.content.split(" ")
    const cmd = msgArray[0]
    const channel = msgArray[1].split("#")[1].split(">")[0]
    // console.log(channel)
    const text = msg.content.replace(`${cmd} ${msgArray[1]}`, "")
    console.log(channel)
    // bot.channels.get(channel).send(text)
    const botText = new Discord.RichEmbed()
    .addField('source ')

    bot.channels.get(channel).send(text)

}
//653749152768983075