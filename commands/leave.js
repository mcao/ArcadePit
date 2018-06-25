exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get('380910598742999050')) return msg.reply('to participate in events, you must be a Racer!');
  msg.reply(await bot.database.remove(msg.author, args.join(' ')));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'leave',
  category: 'Racing',
  description: 'Leave an upcoming event.',
  usage: 'leave <event-name-or-id>'
};