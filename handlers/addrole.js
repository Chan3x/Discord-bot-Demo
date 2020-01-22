module.exports = addRole = (message) => {

    const msgArray = message.content.split(' ')
    const role = message.guild.roles.find(({name}) => name === msgArray[2])
    const member = message.mentions.members.first()
    console.log(member)
    member.addRole(role).catch(console.error)
}