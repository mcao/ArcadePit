exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply('there is no event running right now!');
  if (!bot.event.timed) return msg.reply('this race is in scored mode, not timed mode!');
  if (!msg.mentions.users.first()) return msg.reply('please mention someone to change their score!');
  if (!bot.event.participants[msg.mentions.users.first().id]) return msg.reply('the mentioned user is not in this race!');
  var time = /[0-9]?[0-9]:[0-9][0-9]/g;
  if (!time.exec(args[0])) return msg.reply('the score must be in MM:SS format!');

  var ms = args[0].split(':');
  if (isNaN(ms[0]) | isNaN(ms[1])) return msg.reply('both MM and SS must be numbers!');
  time = (Number(ms[0]) * 60) + Number(ms[1]);

  bot.event.participants[msg.mentions.users.first().id].time = time;
  for (var i = 0; i < bot.event.standings.length; i++) {
    if (bot.event.participants[bot.event.standings[i]].time > time)
      bot.event.standings.splice(i, 0, msg.mentions.users.first().id);
    else if (bot.event.standings[i] == msg.mentions.users.first().id)
      bot.event.standings.splice(i, 1);
  }
  msg.reply(`${msg.mentions.users.first().user}'s time has been changed to **${args[1]}**!`);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'edittime',
  category: 'Racing',
  description: 'Edits someone\'s time if it was entered wrongly.',
  usage: 'edittime <mention> <time>'
};