exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.mentions.users.first()) return msg.reply('please mention someone to unblacklist!');
  var id = msg.mentions.users.first().id,
    i = 0,
    blacklist = require('../banned.json'),
    found = false;
  while (i < blacklist.length && !found) {
    if (blacklist[i] === id) {
      found = true;
    }
    i++;
  }
  if (found) {
    blacklist.splice(i - 1, 1);
    require('fs').writeFileSync('./banned.json', JSON.stringify(blacklist, null, 3));
    msg.channel.send('User ' + msg.mentions.users.first() + ' has been unblacklisted!');
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'raceunban',
  category: 'Racing',
  description: 'Unbans a user from participating in races.',
  usage: 'raceban <user-mention>'
};