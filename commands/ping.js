exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  const m = await msg.channel.send('Ping?');
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'ping',
  category: 'Miscelaneous',
  description: 'It... like... pings. Then Pongs. And it\'s not Ping Pong.',
  usage: 'ping'
};
