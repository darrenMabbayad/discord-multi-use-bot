const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "Shows the user the available Pastabot commands",
    execute (message, args) {
        //message.delete(); // delete command message
        let embed = new Discord.RichEmbed()
            .setTitle("PastaBot command list")
            .setColor("#A083A4")
            .setDescription("!help\n!clearchat #\n!remindme # sec/min/hr\n!setannouncement day time AM/PM message\n!weather city")
            message.channel.send(embed);
            return;
    }
}