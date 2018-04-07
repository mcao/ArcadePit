exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  const m = await msg.channel.send('Ping?');
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'ping',
  category: 'System',
  description: 'Tests the bot\'s latency',
  usage: 'ping'
};
