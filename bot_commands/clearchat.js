const Discord = require('discord.js');

module.exports = {
    name: 'clearchat',
    description: "Allows an administrator to delete comments in a text channel.",
    execute(message, args) {
        let numComments = args[0];

        if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) { // check if member has certain permissions, change if needed 
            message.channel.sendMessage("You don't have permissions for that command."); 
        }

        if (!numComments || isNaN(numComments)) { // if user has not specified the number of comments to delete
            message.reply("Enter number of comments to delete");
            return;
        }
        else {
            if (numComments >= 100 || numComments <= 1) { // if user has specified an invalid number of comments to delete
                message.reply("Can only enter between 2-99");
                return;
            } 
            else {
            message.channel.bulkDelete(numComments) // delete 2-99 messages       
                .catch(error => console.log(error));
            }
        }
    }
}