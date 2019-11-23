const Discord = require('discord.js');

module.exports = {
    name: 'remindme',
    description: "Allows a user to set up mentions to themselves.",
    execute(message, args) {
        let hval = args[0] * 1000 * 60 * 60; // args[0] must be 1-24, time in hours
        let mval = args[0] * 1000 * 60; // args[0] must be 1-59, time in minutes
        let sval = args[0] * 1000; // args[0] must be 1-59, time in seconds
        let timeString = args[1]; // must specifically be hr/hour/hours/min/minute/minutes/sec/second/seconds
        let regex = /hr|hour|hours|min|minute|minutes|sec|second|seconds/i;
        let timeStringCheck = regex.test(timeString);

        if (timeStringCheck === false) {
            message.reply("Specify (1-24) hours, (1-60) minutes , or (1-60) seconds");
        }
        else {
            console.log(`Reminder request from ${message.author.id} at ${Date.now().toString()}`)
            switch (timeString) {
                case "hr":
                case "hour":
                case "hours":
                    setTimeout(remindMe, hval); 
                    break;
                case "min":
                case "minute":
                case "minutes":
                    setTimeout(remindMe, mval); 
                    break;
                case "sec":
                case "second":
                case "seconds":
                    setTimeout(remindMe, sval);
                    break;
            }
        }

        function remindMe() {
            message.reply("You wanted me to remind you about something?", message.author.id);
            return;
        }
    }
}