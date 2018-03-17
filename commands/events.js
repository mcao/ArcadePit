exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  bot.database.Events.findAll({ where: { started: false } }).then(events => {
    msg.channel.send(JSON.stringify(events, null, '\t'));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['eventlist'],
  permLevel: 'User'
};

exports.help = {
  name: 'events',
  category: 'Racing',
  description: 'Returns a list of events.',
  usage: 'events'
};
