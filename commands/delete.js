exports.run = async (bot, msg, args, level) => {
  // eslint-disable-line no-unused-vars
  await bot.database.delete(args.join(" "));
  msg.reply(`successfully deleted the **${args.join(" ")}** race!`);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "delete",
  category: "Tech",
  description: "Deletes an event from the event list.",
  usage: "delete <eventName-or-ID>"
};
