exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.reply(await bot.database.cancel(args.join(' ')));
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'cancel',
  category: 'Tech',
  description: 'Cancels an event.',
  usage: 'cancel <eventName>'
};