exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!msg.member.roles.get(bot.config.raceRole))
    return msg.reply("to participate in event, you must be a Racer!");
  if (
    bot.openEvent &&
    bot.openEvent.name.toLowerCase() == args.join(" ").toLowerCase()
  )
    return msg.reply("this event is already open!");
  try {
    await bot.database.add(msg.author, args.join(" "));
    msg.reply("you have been added to **" + args.join(" ") + "**!");
  } catch (err) {
    msg.channel.send(err.message);
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "join",
  category: "Racing",
  description: "Join an upcoming event.",
  usage: "join <event-name-or-id>"
};
