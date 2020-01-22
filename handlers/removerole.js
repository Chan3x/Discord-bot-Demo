module.exports = removeRole = (message) => {

    const msgArray = message.content.split(' ')
    const role = message.guild.roles.find(({name}) => name === msgArray[2])
    const member = message.mentions.members.first()

    member.removeRole(role).catch(console.error)
}