const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: "Allows an administrator to unmute a server member.",
    async execute(message, args) {

        if (!message.member.hasPermission("ADMINISTRATOR")) { // check if member has certain permissions, change if needed 
            message.channel.send("You don't have permissions for that command."); 
        }

        let personToMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!personToMute) return message.channel.send("Could not find that server member");

        let role = message.guild.roles.find(r => r.name === "Muted"); // check if server has a role called Muted

        if (!role || !personToMute.roles.has(role.id)) return message.channel.send("User is not currently muted");
        await personToMute.removeRole(role);
        message.channel.send(`${message.mentions.users.first()} has been unmuted`);

        return;
    }
}