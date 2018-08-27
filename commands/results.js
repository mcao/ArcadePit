const {
  MessageEmbed
} = require('discord.js');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var event = await bot.database.getEvent(args.join(' '));

  if (bot.openEvent && event.name == bot.openEvent.name)
    event = bot.openEvent
  else if (bot.event && event.name == bot.event.name)
    event = bot.event

  var embed = new MessageEmbed()
    .setTitle(`Results for ${event.name}`)
    .setFooter(msg.guild.name, msg.guild.iconURL())
    .setTimestamp()
    .setColor(msg.guild.me.displayHexColor);

  var stillPlaying = '';
  var finished = '';
  var dnf = '';

  for (var key in event.participants) {
    if (event.participants[key].finished) {
      finished += '<@' + key + '> (' + event.participants[key].time + ' seconds)\n';
    } else if (!event.participants[key].finished && event.participants[key].time != 0) {
      dnf += '<@' + key + '> (DNF, ' + event.participants[key].time + ' seconds)\n'
    } else if (!event.participants[key].finished && event.participants[key].time == 0) {
      stillPlaying += '<@' + key + '> (Not Finished)\n'
    }
  }

  if (finished != '')
    embed.addField('Finished', finished)
  if (dnf != '')
    embed.addField('Forfeited', dnf)
  if (stillPlaying != '')
    embed.addField('Still Playing / Not Started', stillPlaying)

  msg.channel.send({
    embed: embed
  });
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'results',
  category: 'Racing',
  description: 'Returns the results of a certain race.',
  usage: 'results <event-id-or-name>'
};