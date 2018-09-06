exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  msg.channel.send("http://arcadep.it/racing/games.html");
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gamelist",
  category: "Racing",
  description: "Returns a link to the game list.",
  usage: "gamelist"
};
