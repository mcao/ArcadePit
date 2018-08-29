const {
  MessageEmbed
} = require('discord.js');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (args[0] == 'all') {
    bot.database.Events.findAll().then(events => {
      var embed = new MessageEmbed()
        .setAuthor('All Racing Events', bot.user.displayAvatarURL())
        .setDescription('*Do .join <id-or-event-name> to join a race!*')
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setTimestamp()
        .setColor(msg.guild.me.displayHexColor);

      for (var i = 0; i < events.length; i++) {
        embed.addField(`${events[i].externalID}: ${events[i].name} - ${events[i].timed ? 'Timed' : 'Scored'} (${Object.keys(events[i].participants).length || 'No'} Participants) [${events[i].ended ? 'ENDED' : 'NOT STARTED'}]`, events[i].time);
      }

      msg.channel.send({
        embed: embed
      });
    });
  } else {
    bot.database.Events.findAll({
      where: {
        started: false
      }
    }).then(events => {
      var embed = new MessageEmbed()
        .setAuthor('Upcoming Racing Events', bot.user.displayAvatarURL())
        .setDescription('*Do .join <id-or-event-name> to join a race!*')
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setTimestamp()
        .setColor(msg.guild.me.displayHexColor);

      for (var i = 0; i < events.length; i++) {
        embed.addField(`${events[i].externalID}: ${events[i].name} - ${events[i].timed ? 'Timed' : 'Scored'} (${Object.keys(events[i].participants).length || 'No'} Participants)`, events[i].time);
      }

      msg.channel.send({
        embed: embed
      });
    });
  }
};

exports.conf = {
  enabled: true,
  aliases: ['eventlist'],
  permLevel: 'User'
};

exports.help = {
  name: 'events',
  category: 'Racing',
  description: 'Returns a list of events.',
  usage: 'events (optional "all")'
};