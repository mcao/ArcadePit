exports.run = async (bot, msg, args, level) => {// eslint-disable-line no-unused-vars
  await msg.reply('bot is restarting...');
  bot.commands.forEach( async cmd => {
    await bot.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'restartbot',
  category: 'System',
  description: 'Shuts down the bot. If running under PM2, bot will restart automatically.',
  usage: 'restartbot'
};
