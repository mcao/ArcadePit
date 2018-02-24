
exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  if (!msg.guild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
    return msg.channel.send(":x: I can't assign or deassign roles in this server!");
  }

  var role = msg.guild.roles.get('380910598742999050');

  if (msg.guild.members.get(bot.user.id).highestRole.comparePositionTo(role) < 1) {
    msg.channel.send(':x: I don\'t have permissions to edit the role `' + role + '`, please check the role order!');
  } else {
    msg.member.addRole(role).then(m => {
      if (m.roles.has(role.id)) {
        msg.reply('you are now a ' + role.name + '!');
      }
    })
    .catch(console.error);
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
