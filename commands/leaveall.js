exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get('380910598742999050')) return msg.reply('to participate in events, you must be a Racer!');
  msg.reply(await bot.database.removeAll(msg.author));
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'leaveall',
  category: 'Racing',
  description: 'Leaves all the upcoming events you are signed up for.',
  usage: 'leaveall <event-name-or-id>'
};