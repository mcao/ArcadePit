module.exports = (client) => {
  const moment = require('moment');

  client.startWatchdog = async (client) => {
    client.logger.log('Watchdog Started.');
    async function checkForEvent(client) {
      var events = await client.database.Events.findAll({ where: { started: false } });
      for (var i = 0; i < events.length; i++) {
        var date = new Date(events[i].time),
          timeAway = date - new Date();
        
        if (timeAway < 86400000 && events[i].lastReminderSent < 1) {
          sendReminder(events[i].name, date);
          await client.database.Events.update({
            lastReminderSent: 1
          }, {
            where: { id: events[i].id }
          });
        } if (timeAway < 86400000 && events[i].lastReminderSent < 2) {
          sendReminder(events[i].name, date);
          await client.database.Events.update({
            lastReminderSent: 2
          }, {
            where: { id: events[i].id }
          });
        } if (timeAway < 1800000 && !events[i].open) {
          client.channels.get(client.config.raceChannel).send(`<@&380910598742999050>: **${events[i]}** is now open to join!`);
          await client.database.Events.update({
            open: true
          }, {
            where: { id: events[i].id }
          });
        } if (timeAway < 600000 && events[i].lastReminderSent < 3) {
          sendReminder(events[i].name, date);
          await client.database.Events.update({
            lastReminderSent: 3
          }, {
            where: { id: events[i].id }
          });
        } if (timeAway < 300000 && events[i].lastReminderSent < 4) {
          sendReminder(events[i].name, date);
          await client.database.Events.update({
            lastReminderSent: 4
          }, {
            where: { id: events[i].id }
          });
          setTimeout(client.startEvent(), timeAway);
        } 
      }
    }
    await checkForEvent(client);
    setInterval(await checkForEvent(), 30000);

    function sendReminder(event, date) {
      client.channels.get(client.config.raceChannel).send(`<@&380910598742999050>: **${event}** is starting **${moment(new Date(date).toISOString()).fromNow()}!**`);
    }
  };

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level > c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
      }
    }
    return permlvl;
  };

  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      client.logger.log(`Loading Command: ${props.help.name}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on('unhandledRejection', err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
