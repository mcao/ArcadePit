exports.run = async (bot, msg, args, level) => {
  console.log(args.join(" "));
  if (args.join(" ").indexOf("|") < -1)
    return msg.reply(
      "please specify a game name and console name, separated with a '|'!"
    );
  var gamelist = require("../games.json");
  var argsStr = args.join(" ");
  var game = argsStr.split("|")[0].trim();
  var cons = argsStr.split("|")[1].trim();
  gamelist.push({ name: game, console: cons });
  require("fs").writeFileSync("./games.json", JSON.stringify(gamelist));
  delete require.cache[require.resolve("../games.json")];
  msg.reply(args.join(" ") + " has been successfully added to the game list!");
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "addgame",
  category: "Tech",
  description: "Adds a game to the list to choose from.",
  usage: "addgame <game-name> | <console>"
};
