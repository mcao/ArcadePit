exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return;
  bot.logger.log('Stopping and resetting event...');
  for (var id in bot.event.participants) {
    bot.event.participants[id] = {
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
      id: bot.event.id
    }
  });
  bot.openEvent = bot.event;
  bot.eventInProgress = false;
  bot.event = null;
  channel = bot.channels.get(bot.config.raceChannel);
  channel.send('Stopping and resetting event... Please re-mark yourselves as ready and restart the race!');
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