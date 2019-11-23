const Discord = require('discord.js');
var schedule = require('node-schedule');

module.exports = {
    name: 'setannouncement',
    description: "Allows the user to set up announcements at certain times (can be recurring)",
    execute (message, args) {
        console.log(`Announcement request from ${message.author.id} at ${Date.now().toString()}`);
        let time = args.slice(1);
        var minute;
        var hour;
        let regex = /sunday|monday|tuesday|wednesday|thursday|friday|saturday/i;
        let dayOfWeekCheck = regex.test(args[0]);

        // check if a day of the week has been specified
        if (dayOfWeekCheck === false)
            return message.channel.send("Please specify a day of the week"); 
        else {
            if (time[0].length === 4) { // acquire hours and minutes from string
                hour = time[0].substring(0,1);
                minute = time[0].substring(2,4);
            }
            else if (time[0].length === 5) {
                hour = time[0].substring(0,2);
                minute = time[0].substring(3,5);
            }               
        }

        hourNum = parseInt(hour, 10); //convert string to number

        // adjust hours for 24 hour format
        if (time[1] === "am" || time[1] === "AM") hourNum = hourNum;
        else if (time[1] === "pm" || time[1] === "PM") {
            if(hourNum < 12) hourNum = hourNum + 12;
            else hourNum = hourNum;
        }
        else return message.channel.send("Please specify AM or PM");

        // determine day of the week
        var dayOfWeek = args[0];
        switch (dayOfWeek) {
            case "sunday":
            case "Sunday":
                dayOfWeek = 0;
                break;
            case "monday":
            case "Monday":
                dayOfWeek = 1;
                break;
            case "tuesday":
            case "Tuesday":
                dayOfWeek = 2;
                break;
            case "wednesday":
            case "Wednesday":
                dayOfWeek = 3;
                break;
            case "thursday":
            case "Thursday":
                dayOfWeek = 4;
                break;
            case "friday":
            case "Friday":
                dayOfWeek = 5;
                break;
            case "saturday":
            case "Saturday":
                dayOfWeek = 6;
                break;
        }
        
        // determine the message for the announcement
        let msgAnnouncement = args.slice(3);
        toSend = msgAnnouncement.join(" ");
        console.log(toSend);

        let announcement = schedule.scheduleJob(`0 ${minute} ${hour} * * ${dayOfWeek}`, function(){ // 'second | minute | hour | day of month | month | day of week
            let embed = new Discord.RichEmbed()
                .setDescription(`${toSend}`)
                message.channel.send(embed);
                return;
          });
    }
}