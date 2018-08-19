exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.channel.send('http://arcadep.it/racing/index.html');
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'site',
  category: 'Racing',
  description: 'Returns a link to the racing records.',
  usage: 'site'
};