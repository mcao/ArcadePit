const { MessageEmbed } = require('discord.js');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  bot.database.Events.findAll({ where: { started: false } }).then(events => {
    var embed = new MessageEmbed()
      .setAuthor('Upcoming Racing Events', bot.user.displayAvatarURL())
      .setFooter(msg.guild.name, msg.guild.iconURL())
      .setTimestamp()
      .setColor(msg.guild.me.displayHexColor);

    for (var i = 0; i < events.length; i++) {
      embed.addField(`${events[i].externalId}: ${events[i].name} - ${events[i].timed ? 'Timed' : 'Scored'} (${events[i].participants.length} Participants)`, events[i].time);
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
