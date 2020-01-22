const verification = require('./handlers/verification')
module.exports = discordEveents = e => {
     switch(e.t) {
         case 'MESSAGE_REACTION_ADD':
             verification(e)
             break;
         case 'MESSAGE_REACTION_REMOVE':
            verification(e)
             break;
         default:
             break;
     }
 } 