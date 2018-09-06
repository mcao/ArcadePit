exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  msg.channel.send("Updating...").then(e => {
    var evaled = require("child_process")
      .execSync("git pull")
      .toString();
    if (evaled.indexOf("Already up-to-date.") > -1) {
      e.channel.send("There was nothing to update!");
    } else {
      e.channel.send("```" + evaled + "```");
      e.channel.send("New code successfully pulled! Restarting...");
      setTimeout(() => {
        process.exit(0);
      }, 2000);
    }
  });
  return null;
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "update",
  category: "System",
  description: "Pulls code from Github and restarts.",
  usage: "update"
};
