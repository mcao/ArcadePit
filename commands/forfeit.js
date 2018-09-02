exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply('there is no event running right now!');
  if (!msg.member.roles.get(bot.config.raceRole)) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.event.participants[msg.author.id]) return msg.reply('you are not in this race!');
  if (!bot.event.participants[msg.author.id].started) return msg.reply('you are not participating in this race!');

  var yes = await bot.awaitReply(msg, 'Are you sure?');
  if (yes.toLowerCase() !== 'yes' | yes.toLowerCase() !== 'y') return msg.reply('aborting forfeit...');
  
  if (bot.event.timed)
    bot.event.participants[msg.author.id].time = 'DNF';
  else
    bot.event.participants[msg.author.id].score = 'DNF';
  bot.event.participants[msg.author.id].finished = false;
  bot.event.standings.push(msg.author.id);
  msg.reply('you have forfeited **' + bot.event.name + '**!');
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'forfeit',
  category: 'Racing',
  description: 'Forfeits the race and sets your time/score to DNF.',
  usage: 'forfeit'
};
