const {
  MessageEmbed
} = require('discord.js');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var eventName = args.join(' ');
  
  bot.database.Events.findOne({
    where: {
      name: eventName,
    }
  }).then(event => {
    var embed = new MessageEmbed()
      .setAuthor('Players in ' + event.name, bot.user.displayAvatarURL())
      .setFooter(msg.guild.name, msg.guild.iconURL())
      .setTimestamp()
      .setColor(msg.guild.me.displayHexColor);

      var notReady = '';
      var ready = '';

      for (var key in event.participants) {
        if (event.participants[key].ready) {
          ready += '<@' + key + '> (' + bot.users.get(key).username + ')'
        } else {
          notReady += '<@' + key + '> (' + bot.users.get(key).username + ')'
        }
      }

      embed.addField('Ready', ready)
        .addField('Not Ready', notReady);

    msg.channel.send({
      embed: embed
    });
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