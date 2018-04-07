exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get('380910598742999050')) return msg.reply('to participate in event, you must be a Racer!');
  msg.reply(await bot.database.add(msg.author, args.join(' ')));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'join',
  category: 'Racing',
  description: 'Join an upcoming event.',
  usage: 'join <event-name-or-id>'
};