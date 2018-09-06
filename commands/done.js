exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply("there is no event running right now!");
  if (!bot.event.timed)
    return msg.reply("this race is in scored mode, not timed mode!");
  if (!msg.member.roles.get(bot.config.raceRole))
    return msg.reply("to participate in event, you must be a Racer!");
  if (!bot.event.participants[msg.author.id])
    return msg.reply("you are not in this race!");
  var time = /[0-9]?[0-9]:[0-9][0-9]/g;
  if (!time.exec(args[0]))
    return msg.reply("the score must be in MM:SS format!");
  if (!bot.event.participants[msg.author.id].started)
    return msg.reply("you are not participating in this race!");

  var ms = args[0].split(":");
  if (isNaN(ms[0]) | isNaN(ms[1]))
    return msg.reply("both MM and SS must be numbers!");
  time = Number(ms[0]) * 60 + Number(ms[1]);

  bot.event.participants[msg.author.id].time = time;
  bot.event.participants[msg.author.id].finished = true;
  bot.event.standings.push(msg.author.id);
  msg.reply(
    "you have finished **" +
      bot.event.name +
      "**, with a time of **" +
      args[0] +
      "**!"
  );

  var finished = true;
  for (var key in bot.event.participants) {
    if (!bot.event.participants[key].finished) finished = false;
  }
  if (finished) bot.endEvent();
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "done",
  category: "Racing",
  description: "Logs your final time for a race running in time-mode.",
  usage: "done <time>"
};
