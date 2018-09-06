exports.run = async (bot, msg, args, level) => {
  if (!msg.member.roles.get(bot.config.raceRole))
    return msg.reply("to participate in event, you must be a Racer!");

  var event = await bot.database.getEvent(args.join(" "));

  if (
    bot.openEvent &&
    bot.openEvent.name.toLowerCase() == event.name &&
    !bot.openEvent.participants[user.id]
  ) {
    bot.openEvent.participants[user.id] = {
      ready: false,
      started: false,
      finished: false,
      time: 0,
      score: 0
    };
    await bot.database.sync(bot.openEvent);
    msg.reply("you have been added to **" + bot.openEvent.name + "**!");
  } else {
    try {
      await bot.database.add(msg.author, args.join(" "));
      msg.reply("you have been added to **" + args.join(" ") + "**!");
    } catch (err) {
      msg.channel.send(err.message);
    }
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
