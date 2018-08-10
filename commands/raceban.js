exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.mentions.users.first()) return msg.reply('please mention someone to blacklist!');
  let id = msg.mentions.users.first().id,
    i = 0,
    blacklist = require('../banned.json'),
    found = false;
  while (i < blacklist.length && !found) {
    if (blacklist[i] === id) {
      found = true;
      msg.reply("they're already blacklisted!");
    }
    i++;
  }
  if (!found) {
    blacklist.push(id);
    require('fs').writeFileSync('../banned.json', JSON.stringify(blacklist, null, 3));
    msg.channel.send('User ' + msg.content + ' has been blacklisted!');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'raceban',
  category: 'Racing',
  description: 'Bans a user from participating in races.',
  usage: 'raceban'
};