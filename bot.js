require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { Player } = require("discord-music-player");
	//assignable roles via reactions
	//   role name 	  role id 				emoji id/name
	var theAssignableRoles = [
		['crafters', '375671141060182016', ''],
		['mariomakers', '506228220602089482', 'Access to the Mario Maker channels'],
		['developers', '506250420310769684', 'Access to the developers channel'],
		['spoilers', '507549095641088010', 'Access to the spoilers channel']
	];
client.on("guildMemberAdd", (member) => {
  /* console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get(config.welcomeChannel).send(`Welcome **${member.user.username}** to ` + config.serverName + `! Dont forget to check out #` + config.rulesChannel + ` and have a good time!`);
  if (!member.roles.has(config.defaultRole)) {
	  member.addRole(config.defaultRole).catch(console.error);
  } */
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
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easly access it.
client.player = player;
client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        console.log(`Started playing ${song}.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(process.env.DISCORD_BOT_PREFIX) !== 0) return;
  
  // This is the best way to define args. Trust me.
  const args = message.content.slice(process.env.DISCORD_BOT_PREFIX).trim().split(/ +/g);
  const command = args.shift().toLowerCase().replace(process.env.DISCORD_BOT_PREFIX, '');

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