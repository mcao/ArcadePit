exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.eventInProgress || !bot.event) return msg.channel.send('No event appears to be in progress!');
  else {
    var players = bot.event.participants;
    for (var id in players) {
      if (bot.event.timed) {
        if (!players[id].finished)
          players[id].time = -1;
      } else {
        if (!players[id].finished)
          players[id].score = -1;
      }
    }
    bot.eventInProgress = false;
    await bot.database.Events.update(bot.event, {
      where: { id: bot.event.id }
    });
    return msg.channel.send('<@&380910598742999050>: The ' + bot.event.name + ' event has ended!');
    // bot.sendStandings(bot.event.id)
    bot.event = null;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'end',
  category: 'Racing',
  description: 'Ends an event early.',
  usage: 'end'
};