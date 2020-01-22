const Discord = require('discord.js')

const Botcfg = require('./configs/Bot')

const Token = Botcfg.token

const Guilds = require('./configs/Guillds')

const commandsWithHandlers = require('./botCommands')


const findGuild = findById => {
    return Guilds.find(({id}) => id === findById)
}

const bot = new Discord.Client({
    disableEveryone: true
})

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
    bot.user.setActivity('Chat  ++help', {
      type: "Watching"
    })
    console.log("Bot is Ready for hard work !")
})

bot.on('messageReactionAdd', async (reaction, user) => {
    console.log(reaction, user)
    if(reaction.emoji.name === "✅") return
    if(user === bot.user) return
 
    const role = bot.guild.roles.find("name", "Verified")
 
    await user.addRole(role.id)
  })

bot.on('message', message => {
    const guild = findGuild(message.guild.id)
    const messageArray = message.content.split(' ')
    const cmd = messageArray[0]
    if(guild) {
        commandsWithHandlers(cmd,message,guild, bot)
    } else {

    }

})

// bot.on('raw', event => {
//     discordEveents(event)
// })

const setupCMD = "!setreactionrole"
const initialMessage = `**Welcome !**`
const roles = ["Verified"]
const reactions = ["✅"]
 
function generateMessages(){
    const messages = []
    messages.push(initialMessage)
    for (let role of roles) messages.push(`React below to get **"${role}"**`)
    return messages
}
 
 
bot.on("message", message => {
    if (message.member.hasPermission("ADMINISTRATOR") && message.content.toLowerCase() == setupCMD){

        const toSend = generateMessages()
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])]

        for (let mapObj of mappedArray){

            message.channel.send(mapObj[0]).then( sent => {

                if (mapObj[1]){

                  sent.react(mapObj[1])

                }
            })
        }
    }
})
 
bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
       
        const channel = bot.channels.get(event.d.channel_id)
        const message = channel.fetchMessage(event.d.message_id).then(msg=> {
        const user = msg.guild.members.get(event.d.user_id)
       
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = msg.content.match(re)[1]
       
            if (user.id != bot.user.id){

                const roleObj = msg.guild.roles.find(r => r.name === role)
                const memberObj = msg.guild.members.get(user.id)
               
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj)
                }
            }
        }
        })
 
    }  
})
bot.login(Token) 