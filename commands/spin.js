exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  var gamelist = require("../games.json");
  if (gamelist.length < 3 && gamelist.length > 0) {
    var str = "Game List:\n";

    for (var i = 0; i < gamelist.length; i++) {
      str += i + ": " + gamelist[i].name + " || " + gamelist[i].console + "\n";
    }

    msg.channel.send(str);
  } else if (gamelist == 0) {
    msg.channel.send("There are no games in the list!");
  } else {
    gamelist = getRandom(gamelist, 3);
    var str = "Game List:\n";

    for (var i = 0; i < gamelist.length; i++) {
      str += i + ": " + gamelist[i].name + " || " + gamelist[i].console + "\n";
    }

    msg.channel.send(str);
  }

  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "spin",
  category: "Racing",
  description: "Displays three games from the game list.",
  usage: "spin"
};
