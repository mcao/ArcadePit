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
    .setAuthor('Players in ' + event.name, bot.user.displayAvatarURL())
    .setFooter(msg.guild.name, msg.guild.iconURL())
    .setTimestamp()
    .setColor(msg.guild.me.displayHexColor);

  var notReady = '';
  var ready = '';

  for (var key in event.participants) {
    if (event.participants[key].ready) {
      ready += '<@' + key + '> (' + bot.users.get(key).username + ')\n'
    } else {
      notReady += '<@' + key + '> (' + bot.users.get(key).username + ')\n'
    }
  }

  if (ready != '')
    embed.addField('Ready', ready);
  if (notReady != '')
    embed.addField('Not Ready', notReady);

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
  name: 'players',
  category: 'Racing',
  description: 'Gives a list of users that are in a certain race.',
  usage: 'players'
};