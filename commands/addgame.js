exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var gamelist = require('../games.json');
  gamelist.push(args.join(' '));
  require('fs').writeFileSync('./games.json', JSON.stringify(gamelist));
  delete require.cache[require.resolve('../games.json')];
  msg.reply(args.join(' ') + ' has been successfully added to the game list!');
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'addgame',
  category: 'Tech',
  description: 'Adds a game to the list to choose from.',
  usage: 'addgame <game-name>'
};