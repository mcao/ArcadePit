exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event && !bot.openEvent) return msg.channel.send('There is no event running or open right now!');
  if (bot.event) return msg.channel.send(`**${bot.event.name}** has been running for ${hms((new Date() - bot.startedAt) / 1000)}`)
  if (bot.openEvent) return msg.channel.send(`**${bot.openEvent.name}** will be starting in ${hms(new Date(bot.openEvent.time) - new Date())}`)

  function hms(seconds) {
    return new Date(null)
      .addSeconds(seconds)
      .toString('mm:ss');
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'time',
  category: 'Racing',
  description: 'Returns the time until a race starts, or that a race has been going on.',
  usage: 'time'
};