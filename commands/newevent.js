exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.content = msg.content.split(' ').splice(1).join(' ');
  if (msg.content.indexOf('|') < 0) msg.channel.send('Please include the name and date of the event, split by a "|"!');
  var eventName = msg.content.split('|')[0].trim();
  var eventTime = new Date(msg.content.split('|')[1].trim());

  const response = await bot.awaitReply(msg, `Is this correct?\n\n**Event Info:**\nName: ${eventName}\nTime: ${eventTime.toLocaleString()}`);

  if (response.toLowerCase().trim() == 'no') {
    msg.channel.send('Aborting...');
    return null;
  } else if (response.toLowerCase().trim() == 'yes') {
    bot.database.create({
      name: eventName,
      creator: msg.author.id,
      time: eventTime
    }).then(() => {
      msg.reply('event successfully created!');
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'newevent',
  category: 'Racing',
  description: 'Creates a new racing event.',
  usage: 'newevent <name> | <time>'
};
