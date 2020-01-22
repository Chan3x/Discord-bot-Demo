const {
    hello,
    help,
    addRole,
    removeRole,
    writeInChannel
} = require('./handlers')

// const isAllowd = (msgChannel,cmdChannel,callback) => {
//     if(msgChannel === cmdChannel)
//         return callback
// }
module.exports = commandsWithHandlers = (cmd, msg, guild, bot) => {
    cmd = cmd.split(guild.prefix)[1].toLowerCase()
    switch(cmd) {
        case 'hello':
            hello(msg)
            break
        case 'help':
            help(msg)
            break
        case 'addRole':
            addRole(msg)
            break
        case 'removeRole':
            removeRole(msg)
            break
        case 'write':
            writeInChannel(msg, bot)
            break
        default:
            break
    }
}   