exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply('there is no event running right now!');
  if (bot.event.timed) return msg.reply('this race is in timed mode, not scored mode!');
  if (!msg.member.roles.get(bot.config.raceRole)) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.event.participants[msg.author.id]) return msg.reply('you are not in this race!');
  if (isNaN(args[0])) return msg.reply('the score must be a number!');
  if (!bot.event.participants[msg.author.id].started) return msg.reply('you are not participating in this race!');

  bot.event.participants[msg.author.id].score = args[0];
  bot.event.participants[msg.author.id].finished = true;
  bot.event.standings.push(msg.author.id);
  msg.reply('you have finished **' + bot.event.name + '**, with a score of **' + args[0] + '**!');
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'score',
  category: 'Racing',
  description: 'Logs your final score for a race running in score-mode.',
  usage: 'score <number>'
};