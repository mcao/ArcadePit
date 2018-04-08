const { inspect } = require('util');
const { post } = require('snekfetch');

exports.run = async (bot, msg, args, level) => { // eslint-disable-line no-unused-vars
  const code = args.join(' ');
  const token = bot.token.split('').join('[^]{0,2}');
  const rev = bot.token.split('').reverse().join('[^]{0,2}');
  const filter = new RegExp(`${token}|${rev}`, 'g');
  try {
    let output = eval('async function() {' + code + '}');
    if (output instanceof Promise || (Boolean(output) && typeof output.then === 'function' && typeof output.catch === 'function')) output = await output;
    output = inspect(output, { depth: 0, maxArrayLength: null });
    output = output.replace(filter, '[TOKEN]');
    output = clean(output);
    if (output.length < 1950) {
      msg.channel.send(`\`\`\`js\n${output}\n\`\`\``);
    } else {
      try {
        const { body } = await post('https://www.hastebin.com/documents').send(output);
        msg.channel.send(`Output was to long so it was uploaded to hastebin https://www.hastebin.com/${body.key}.js `);
      } catch (error) {
        msg.channel.send(`I tried to upload the output to hastebin but encountered this error ${error.name}:${error.message}`);
      }
    }
  } catch (error) {
    msg.channel.send(`The following error occured \`\`\`js\n${error.stack}\`\`\``);
  }

  function clean(text)  {
    return text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Owner'
};

exports.help = {
  name: 'eval',
  category: 'System',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};
