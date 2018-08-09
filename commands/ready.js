exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get('380910598742999050')) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.event) return msg.reply('there is no event open right now!');
  if (!bot.event.participants[msg.author.id]) return msg.reply('you are not registered for this race!');
  if (bot.event.participants[msg.author.id].ready) return msg.reply('you are already marked as ready!');

  bot.event.participants[msg.author.id].ready = true;
  msg.reply('you have been marked down as ready for **' + bot.event.name + '**!');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'ready',
  category: 'Racing',
  description: 'Mark someone as ready for an upcoming event.',
  usage: 'ready'
};