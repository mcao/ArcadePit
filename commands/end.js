exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.eventInProgress || !bot.event) return msg.channel.send('No event appears to be in progress!');
  else {
    bot.event.forciblyEnded = true;
    msg.channel.send('<@&' + bot.config.raceRole + '>: The ' + bot.event.name + ' event has ended!');
    await bot.endEvent();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'end',
  category: 'Racing',
  description: 'Ends the currently running event early.',
  usage: 'end'
};