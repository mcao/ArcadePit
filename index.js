if (process.version.slice(1).split(".")[0] < 8)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const bot = new Discord.Client();

bot.config = require("./config.js");
bot.logger = require("./util/Logger");
bot.database = require("./util/Database");
bot.commands = new Enmap();
bot.aliases = new Enmap();

require("./modules/functions.js")(bot);

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  bot.logger.log(`Loading ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = bot.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  bot.logger.log(`Loading ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  bot.levelCache = {};
  for (let i = 0; i < bot.config.permLevels.length; i++) {
    const thisLevel = bot.config.permLevels[i];
    bot.levelCache[thisLevel.name] = thisLevel.level;
  }

  bot.database.initialize();

  bot.login(bot.config.token);
};

init();
