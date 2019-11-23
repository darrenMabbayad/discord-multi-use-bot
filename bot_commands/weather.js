const Discord = require('discord.js');
const config = require("../config/command_config.json");
const fetch = require("node-fetch");
const appid = "&appid=" + config.openWeatherMapKey;

module.exports = {
    name: 'weather',
    description: "Shows the user various weather information in a specified location",
    execute (message, args) {
        //message.delete(); // delete command message
        console.log(args);

        const baseUrl = "http://api.openweathermap.org/data/2.5/weather";
        let q = "?q="+ args.join("%20"); // user inputs a city
        let units = "&units=imperial";
        let url = baseUrl + q + appid + units;
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if(json.main === undefined) return message.channel.send("Invalid city/location");
                let embed = new Discord.RichEmbed()
                .setTitle("Weather info about " + json.name)
                .setColor("#A083A4")
                .addField("Current Temperature", `${json.main.temp} °F`)
                .addField("Winds", `${json.wind.speed} mph`)
                .addField("Humindity", `${json.main.humidity}%`)
                message.channel.send(embed);
                return;
            });
    }
}