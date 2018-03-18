exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  msg.content = msg.content.split(' ').splice(1).join(' ');
  if (msg.content.indexOf('|') < 0) return msg.channel.send('Please include the name and date of the event, split by a "|"!');
  if (!msg.content.split('|')[0] | msg.content.split('|')[1] | msg.content.split('|')[2]) return msg.channel.send('You are missing one or more arguments!');
  
  var eventName = msg.content.split('|')[0].trim();
  var eventTime = new Date(msg.content.split('|')[1].trim());
  var eventTimed = msg.content.split('|')[2].trim();

  if (eventTimed.toLowerCase() == 'timed') eventTimed = true;
  else if (eventTimed.toLowerCase() == 'scored') eventTimed = false;
  else return msg.channel.send('Third option must be "timed" or "scored"!');

  const response = await bot.awaitReply(msg, `Is this correct?\n\n**Event Info:**\nName: ${eventName}\nTime: ${eventTime.toLocaleString()}\nTimed: ${eventTimed}`);

  if (response.toLowerCase().trim() == 'no') {
    msg.channel.send('Aborting...');
    return null;
  } else if (response.toLowerCase().trim() == 'yes') {
    bot.database.create({
      name: eventName,
      creator: msg.author.id,
      time: eventTime,
      timed: eventTimed,
    }).then(() => {
      msg.reply('event successfully created!');
    }).catch(err => {
      msg.channel.send('ERROR: ' + err.parent.detail);
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
  category: 'Tech',
  description: 'Creates a new racing event.',
  usage: 'newevent <name> | <time> | timed/scored'
};
