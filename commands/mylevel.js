exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "mylevel",
  category: "System",
  description: "Tells you your permission level for the server you are in.",
  usage: "mylevel"
};
