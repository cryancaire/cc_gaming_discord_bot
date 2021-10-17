require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
	//assignable roles via reactions
	//   role name 	  role id 				emoji id/name
	var theAssignableRoles = [
		['crafters', '375671141060182016', ''],
		['mariomakers', '506228220602089482', 'Access to the Mario Maker channels'],
		['developers', '506250420310769684', 'Access to the developers channel'],
		['spoilers', '507549095641088010', 'Access to the spoilers channel']
	];
client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get(config.welcomeChannel).send(`Welcome **${member.user.username}** to ` + config.serverName + `! Dont forget to check out #` + config.rulesChannel + ` and have a good time!`);
  if (!member.roles.has(config.defaultRole)) {
	  member.addRole(config.defaultRole).catch(console.error);
  }
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
  
  
  
});

client.on('messageReactionAdd', (reaction, user, message) => {
	const craftRole = "375671141060182016";
	
    if(reaction.emoji.name === "grassblock") {
        //console.log(reaction.emoji.guild.members.get(user.id));
		//console.log(user.lastMessage.channel.guild.members.get(user.id));
		//console.log(message);
		
		
		//var memberObj = user.lastMessage.channel.guild.members.get(user.id);
		var memberObj = reaction.emoji.guild.members.get(user.id);
		memberObj.addRole(craftRole);

   }
});

client.on('messageReactionRemove', (reaction, user, message) => {
	const craftRole = "375671141060182016";
    if(reaction.emoji.name === "grassblock") {
        //console.log(user.id);
		//console.log(user.lastMessage.channel.guild.members.get(user.id));
		//console.log(message);
		var memberObj = reaction.emoji.guild.members.get(user.id);
		
		memberObj.removeRole(craftRole);

   }
});


client.login(process.env.DISCORD_BOT_TOKEN);