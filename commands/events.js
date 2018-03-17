const { MessageEmbed } = require('discord.js');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  bot.database.Events.findAll({ where: { started: false } }).then(events => {
    var embed = new MessageEmbed()
      .setAuthor('Upcoming Racing Events', bot.user.displayAvatarURL())
      .setFooter(msg.guild.name, msg.guild.iconURL())
      .setTimestamp();

    for (var i = 0; i < events.length; i++) {
      embed.addField(`${events[0].id}: ${events[0].name}, ${events[0].timed ? 'Timed' : 'Scored'} (${events[i].participants.length} Participants)`, events[0].time);
    }

    msg.channel.send({ embed: embed });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['eventlist'],
  permLevel: 'User'
};

exports.help = {
  name: 'events',
  category: 'Racing',
  description: 'Returns a list of events.',
  usage: 'events'
};
