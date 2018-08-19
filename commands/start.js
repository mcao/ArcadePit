exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (bot.openEvent) {
    bot.startEvent(bot, bot.openEvent);
  } else {
    msg.reply('there is no event open right now!');
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'start',
  category: 'Racing',
  description: 'Starts the next event.',
  usage: 'start'
};