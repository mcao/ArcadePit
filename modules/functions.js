module.exports = (bot) => {
  const moment = require('moment');
  const MINUTE = 60000;

  /**
   * Function that checks if all players are ready and then begins the event.
   */
  bot.startEvent = async (bot, e) => {
    if (!bot.openEvent) return;
    const channel = bot.channels.get(bot.config.raceChannel);
    var allReady = true;

    for (var id in bot.openEvent.participants) {
      if (!bot.openEvent.participants[id].ready) {
        allReady = false;
      }
    }

    if (allReady) {
      bot.logger.log('All participants are ready. Starting event...');
      bot.event = bot.openEvent, bot.openEvent = null;
      bot.eventInProgress = true;
      for (var id in bot.event.participants) {
        bot.event.participants[id].started = true;
      }

      channel.send('<@&' + bot.config.raceRole + '>: ' + bot.event.name + ' is starting in 4 seconds!');
      setTimeout(() => {channel.send('3!')}, 1000);
      setTimeout(() => {channel.send('2!')}, 2000);
      setTimeout(() => {channel.send('1!')}, 3000);
      setTimeout(async () => {
        channel.send('**GO!**');
        bot.startedAt = new Date();
        bot.event.started = true;
        await bot.database.sync(bot.event);
      }, 4000);
    } else {
      for (var id in bot.openEvent.participants) {
        var notReady = "Not Ready:\n";
        if (!bot.openEvent.participants[id].ready)
          notReady += `<@${id}>`;
      }
      channel.send(notReady);
      channel.send("Not everybody is ready yet! Aborting start...");
      setTimeout(bot.startEvent(), MINUTE * 5);
    }
  };

  /**
   * Function that forcibly ends the event whether all participants are finished or not.
   * Can also be called if all participants are finished to end the event.
   */
  bot.endEvent = async () => {
    if (!bot.event) return;

    var players = bot.event.participants;
    for (var id in players) {
      if (bot.event.timed) {
        if (!players[id].finished)
          players[id].time = -1;
      } else {
        if (!players[id].finished)
          players[id].score = -1;
      }
    }
    bot.event.participants = players;
    bot.eventInProgress = false;
    bot.startedAt = null;
    await bot.database.sync(bot.event);
    // bot.sendStandings(bot.event);
    setTimeout(async () => {
      await bot.database.sync(bot.event);
      bot.event = null;
    }, MINUTE * 10);
  };

  /**
   * Function that executes every 30 seconds and checks if reminders 
   * need to be sent and/or the event needs to be opened or started.
   */
  bot.startWatchdog = async (bot) => {
    bot.logger.log('Watchdog Started.');

    async function checkForEvent(bot) {
      var events = await bot.database.getFutureEvents();

      for (var i = 0; i < events.length; i++) {
        var date = new Date(events[i].time),
          timeAway = date - new Date();

        if (timeAway < MINUTE * 1440 && events[i].lastReminderSent < 1)
          await sendReminder(events[i].name, date, 1);
        if (timeAway < MINUTE * 60 && events[i].lastReminderSent < 2)
          await sendReminder(events[i].name, date, 2);
        if (timeAway < MINUTE * 30 && !events[i].open)
          await openEvent(events[i]);
        if (timeAway < MINUTE * 10 && events[i].lastReminderSent < 3)
          await sendReminder(events[i].name, date, 3);
        if (timeAway < MINUTE * 5 && events[i].lastReminderSent < 4) {
          await sendReminder(events[i], date, 4);
          setTimeout(async function () {
            bot.startEvent(bot, events[i]);
          }, timeAway);
        }
      }
      setTimeout(function () {
        checkForEvent(bot).then(() => {});
      }, 30000);
    }
    await checkForEvent(bot);

    async function sendReminder(eventName, date, lastReminder) {
      var event = await bot.database.getEvent(eventName);
      await bot.database.setLastReminder(lastReminder, event.id);
      event.lastReminderSent = lastReminder;
      await bot.database.sync(event);
      bot.channels.get(bot.config.raceChannel).send(`<@&${bot.config.raceRole}>: **${event.name}** is starting **${moment(new Date(date).toISOString()).fromNow()}!**`);
    }

    async function openEvent(event) {
      bot.channels.get(bot.config.raceChannel).send(`<@&${bot.config.raceRole}>: You may now set yourself as ready for **${event.name}**!`);
      await bot.database.openEvent(event.id);
      bot.openEvent = event;
    }
  };

  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  bot.permlevel = message => {
    let permlvl = 0;

    const permOrder = bot.config.permLevels.slice(0).sort((p, c) => p.level > c.level ? 1 : -1);

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

  const response = await bot.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  bot.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ['time']
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  bot.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      bot.logger.log(`Loading Command: ${props.help.name}`);
      if (props.init) {
        props.init(bot);
      }
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  bot.unloadCommand = async (commandName) => {
    let command;
    if (bot.commands.has(commandName)) {
      command = bot.commands.get(commandName);
    } else if (bot.aliases.has(commandName)) {
      command = bot.commands.get(bot.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(bot);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  String.prototype.toProperCase = function () {
    return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    bot.logger.error(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on('unhandledRejection', err => {
    bot.logger.error(`Unhandled rejection: ${err}`);
  });
};