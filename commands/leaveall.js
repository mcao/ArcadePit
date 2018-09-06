exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get(bot.config.raceRole))
    return msg.reply("to participate in events, you must be a Racer!");
  await bot.database.removeAll(msg.author);
  msg.reply("successfully removed you from all races!");
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leaveall",
  category: "Racing",
  description: "Leaves all the upcoming events you are signed up for.",
  usage: "leaveall <event-name-or-id>"
};
