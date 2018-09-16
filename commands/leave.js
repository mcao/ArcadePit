exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get(bot.config.raceRole))
    return msg.reply("to participate in events, you must be a Racer!");
  try {
    var event = await bot.database.getEvent(args.join(" "));
    if (
      bot.openEvent &&
      bot.openEvent.name.toLowerCase() == event.name &&
      bot.openEvent.participants[msg.author.id]
    ) {
      delete bot.openEvent.participants[msg.author.id];
    }
    await bot.database.remove(msg.author, args.join(" "));
    msg.reply("successfully removed you from **" + event.name + "**!");
  } catch (err) {
    msg.reply(err);
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "leave",
  category: "Racing",
  description: "Leave an upcoming event.",
  usage: "leave <event-name-or-id>"
};
