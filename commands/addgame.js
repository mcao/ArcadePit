exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var gamelist = require('../games.json');
  gamelist.push(args.join(' '));
  require('fs').writeFileSync('./games.json', JSON.stringify(gamelist))
  msg.reply(args.join(' ') + " has been successfully added to the game list!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'addgame',
  category: 'Racing',
  description: 'Adds a game to the list to choose from.',
  usage: 'addgame <game-name>'
};