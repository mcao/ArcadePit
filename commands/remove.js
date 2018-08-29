exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.mentions.users.first()) return msg.reply('You must mention someone to remove!');
  args.splice(0, 1);
  console.log(args.join(' '));
  msg.reply(await bot.database.remove(msg.mentions.users.array()[0], args.join(' ')));
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'remove',
  category: 'Racing',
  description: 'Removes a user from an upcoming event.',
  usage: 'remove <mention> <event-name-or-id>'
};