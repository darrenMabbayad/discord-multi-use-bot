const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: "Allows an administrator to mute a server member.",
    async execute(message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) { // check if member has certain permissions, change if needed 
            message.channel.send("You don't have permissions for that command."); 
            return;
        }

        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user); // check if the user is in the server
            
            if (member) {
                member.kick().then(() => {
                    message.channel.send(`${member} has been kicked from the server`)
                }).catch(e => {
                    message.reply("Unable to kick this member");
                    console.log(e);
                });
            }
            else message.reply("That user isn\'t a member of the server");
        }
        else message.reply("Please specify a user");

        return;
    }
}