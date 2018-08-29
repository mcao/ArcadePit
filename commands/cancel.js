exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  try {
    await bot.database.cancel(args.join(' '));
    msg.reply('**' + args.join(' ') + '** has been successfully cancelled!');
  } catch (err) {
    msg.reply(err);
  }
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
  usage: 'cancel <eventName-or-ID>'
};