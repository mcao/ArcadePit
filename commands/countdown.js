exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.channel.send('5!');
  await bot.wait(1000);
  msg.channel.send('4!');
  setTimeout(() => {
    msg.channel.send('3!');
  }, 2000);
  setTimeout(() => {
    msg.channel.send('2!');
  }, 3000);
  setTimeout(() => {
    msg.channel.send('1!');
  }, 4000);
  setTimeout(() => {
    msg.channel.send('**GO!**');
  }, 5000);
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