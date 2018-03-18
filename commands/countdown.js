exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.channel.send('5');
  await bot.sleep(1000);
  msg.channel.send('4');
  await bot.sleep(1000);
  msg.channel.send('5');
  await bot.sleep(1000);
  msg.channel.send('2');
  await bot.sleep(1000);
  msg.channel.send('1');
  await bot.sleep(1000);
  msg.channel.send('GO!');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'countdown',
  category: 'Utility',
  description: 'Starts a countdown!',
  usage: 'countdown'
};