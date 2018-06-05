var fs = require('fs');

process.on('unhandledRejection', (reason) => {
  console.error(reason);
  process.exit(1);
});

try {
	var Discord = require("discord.js");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}
console.log("Starting DiscordBot\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);



// Get authentication data
try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Please fill in the auth.json.\n"+e.stack);
	process.exit();
}

var bot = new Discord.Client();

var hooks = {
	onMessage: []
}

bot.on("ready", function () {
	console.log("Logged in! Serving in " + bot.guilds.array().length + " servers");
	require("./plugins.js").init(hooks);
	bot.user.setActivity( "PUBG", { type: 'playing' });

});

bot.on("disconnected", function () {

	console.log("Disconnected!");
	process.exit(1); //exit node.js with an error

});

if(AuthDetails.bot_token){
	console.log("logging in with token");
	bot.login(AuthDetails.bot_token);
} else {
	console.log("Logging in with user credentials is no longer supported!\nYou can use token based log in with a user account, see\nhttps://discord.js.org/#/docs/main/master/general/updating");
}
const http = require('http');
var express = require('express');
var app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " It's Working. ;3");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
