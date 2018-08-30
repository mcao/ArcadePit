exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!bot.event) return msg.reply('there is no event running right now!');
  if (!msg.member.roles.get(bot.config.raceRole)) return msg.reply('to participate in event, you must be a Racer!');
  if (!bot.event.participants[msg.author.id]) return msg.reply('you are not in this race!');
  if (!bot.event.participants[msg.author.id].started) return msg.reply('you are not participating in this race!');

  bot.event.participants[msg.author.id].time = 0;
  bot.event.participants[msg.author.id].score = 0;
  bot.event.participants[msg.author.id].finished = false;
  
  for(var i = 0; i < bot.event.standings.length; i++) {
    if (bot.event.standings[i] == msg.mentions.users.first().id)
      bot.event.standings.splice(i, 1);
  }
  msg.reply('you have been put back into the race!');
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'undone',
  category: 'Racing',
  description: '"Undones" you and puts you back into the race.',
  usage: 'undone'
};