exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  bot.logger.log('Stopping and resetting event...');
  for (var id in bot.event.participants) {
    bot.event.participants[i] = {
      ready: false,
      started: false,
      finished: false,
      time: 0,
      score: 0
    };
  }
  bot.startedAt = null;
  await bot.database.Events.update({
    started: false,
    participants: bot.event.participants
  }, {
    where: {
      id: event.id
    }
  });
  bot.openEvent = bot.event;
  bot.eventInProgress = false;
  bot.event = null;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'restart',
  category: 'Racing',
  description: 'Restarts an event if something goes wrong.',
  usage: 'restart'
};