exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get(bot.config.raceRole)) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.openEvent) return msg.reply('there is no event open right now!');
  if (!bot.openEvent.participants[msg.author.id]) return msg.reply('you are not registered for this race!');
  if (bot.openEvent.participants[msg.author.id].ready) return msg.reply('you are already marked as ready!');

  bot.openEvent.participants[msg.author.id].ready = true;
  msg.reply('you have been marked down as ready for **' + bot.openEvent.name + '**!');
  var i = 0;
  for (var user in bot.openEvent.participants) {
    if (!bot.openEvent.participants[user].ready) {
      i++;
    }
  }
  msg.channel.send(i + ' more people need to mark themselves as ready!');
  if (i == 0) {
    msg.channel.send('The race is now ready to begin!');
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'ready',
  category: 'Racing',
  description: 'Mark someone as ready for an upcoming event.',
  usage: 'ready'
};