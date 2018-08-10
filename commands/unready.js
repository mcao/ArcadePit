exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get('380910598742999050')) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.openEvent) return msg.reply('there is no event open right now!');
  if (!bot.openEvent.participants[msg.author.id]) return msg.reply('you are not registered for this race!');
  if (!bot.openEvent.participants[msg.author.id].ready) return msg.reply('you are already marked as not ready!');

  bot.openEvent.participants[msg.author.id].ready = false;
  msg.reply('you have been marked down as NOT ready for **' + bot.openEvent.name + '**!');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'unready',
  category: 'Racing',
  description: 'Mark someone as not ready for an upcoming event.',
  usage: 'unready'
};