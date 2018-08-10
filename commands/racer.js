
exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
    return msg.channel.send(':x: I can\'t assign or deassign roles in this server!');
  } else if (require('./banned.json').indexOf(msg.author.id) > -1) {
    return;
  }

  var role = msg.guild.roles.get('380910598742999050');

  if (!role.editable) {
    msg.channel.send(':x: I don\'t have permissions to edit the role `' + role + '`, please check the role order!');
  } else {
    if (msg.member.roles.has(role.id)) {
      msg.member.roles.remove(role).then(() => {
        msg.reply('you\'re no longer a racer!');
      }).catch(console.error);
    } else {
      msg.member.roles.add(role).then(() => {
        msg.reply('you\'re now a racer!');
      }).catch(console.error);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'racer',
  category: 'Racing',
  description: 'Gives the user the racer role.',
  usage: 'racer'
};
