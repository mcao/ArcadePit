exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  var gamelist = require("../games.json"),
    str = "Current Challenge priority:\n";

  for (var i = 0; i < gamelist.length; i++) {
    str += i + ": " + gamelist[i].name + " || " + gamelist[i].console + "\n";
  }

  msg.channel.send(str);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "games",
  category: "Racing",
  description: "Displays the game list.",
  usage: "games"
};
