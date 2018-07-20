exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var gamelist = require('./games.json');
  if (gamelist.indexOf(args.join(' ')) > -1) {
    delete gamelist[gamelist.indexOf(args.join(' '))];
    require('fs').writeFileSync('./games.json', JSON.stringify(gamelist));
    msg.reply(args.join(' ') + " has been successfully removed from the game list!");
  } else {
    msg.reply(args.join(' ') + " is not on the game list!");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'removegame',
  category: 'Racing',
  description: 'Removes a game from the list to choose from.',
  usage: 'removegame <game-name>'
};