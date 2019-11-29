const Discord = require('discord.js');
const config = require("./config/config.json");
const fs = require('fs');

const bot = new Discord.Client({disableEveryone: true});
const prefix = config.prefix;
bot.commands = new Discord.Collection();

// set up command handler
const commandFiles = fs.readdirSync('./bot_commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./bot_commands/${file}`);
    bot.commands.set(command.name, command);
}

// log if the bot is working, bot name specified
bot.on('ready', () => {
    console.log(`Bot online: ${bot.user.username}`);
})

bot.on('message', message => {
    let argsArr = message.content.split(" "); 
    let command = argsArr[0];
    let args = argsArr.slice(1);

    if (!message.content.startsWith(config.prefix)) return;

    switch(command) {
        // All member commands
        case `${prefix}gearU`:
            bot.commands.get('gearU').execute(message, args);
            break;
        case `${prefix}gearP`:
            bot.commands.get('gearP').execute(message, args);
            break;
        case `${prefix}help`:
            bot.commands.get('help').execute(message, args);
            break;
        case `${prefix}remindme`:
            bot.commands.get('remindme').execute(message, args);
            break;
        case `${prefix}weather`:
            bot.commands.get('weather').execute(message, args);
            break;   
        // Administrator Commands
        case `${prefix}ban`:
            bot.commands.get('ban').execute(message, args);
            break;
        case `${prefix}clearchat`:
            bot.commands.get('clearchat').execute(message, args);
            break;
        case `${prefix}mute`:
            bot.commands.get('mute').execute(message, args);
            break;
        case `${prefix}unmute`:
            bot.commands.get('unmute').execute(message, args);
            break;
        case `${prefix}setannouncement`:
            bot.commands.get('setannouncement').execute(message, args);
            break;
        case `${prefix}userinfo`:
            bot.commands.get('userinfo').execute(message, args);
            break;
    }           
})

bot.login(config.token);