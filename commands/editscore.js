exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply('there is no event running right now!');
  if (bot.event.timed) return msg.reply('this race is in timed mode, not scored mode!');
  if (!msg.mentions.users.first()) return msg.reply('please mention someone to change their score!');
  if (!bot.event.participants[msg.mentions.users.first().id]) return msg.reply('the mentioned user is not in this race!');
  if (isNaN(args[1])) return msg.reply('the score must be a number!');

  bot.event.participants[msg.mentions.users.first().id].score = args[1];
  for (var i = 0; i < bot.event.standings.length; i++) {
    if (bot.event.participants[bot.event.standings[i]].score > args[1])
      bot.event.standings.splice(i, 0, msg.mentions.users.first().id);
    else if (bot.event.standings[i] == msg.mentions.users.first().id)
      bot.event.standings.splice(i, 1);
  }
  msg.reply(`${msg.mentions.users.first()}'s score has been changed to **${args[1]}**!`);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'editscore',
  category: 'Racing',
  description: 'Edits someone\'s score if it was entered wrongly.',
  usage: 'editscore <mention> <number>'
};