exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  var eventname = args.join(' ');
  bot.database.Events.destroy({
    where: {
      name: eventname
    }
  }).then(() => {
    msg.reply(`successfully deleted the **${eventname}** race!`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'delete',
  category: 'Tech',
  description: '',
  usage: 'delete <eventName>'
};