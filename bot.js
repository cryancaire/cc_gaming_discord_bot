require('dotenv').config()
const { Client, GatewayIntentBits, Events } = require("discord.js");

let intents = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
}

const client = new Client(intents);
const fs = require("fs");


client.on("guildMemberAdd", (member) => {
  /* console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get(config.welcomeChannel).send(`Welcome **${member.user.username}** to ` + config.serverName + `! Dont forget to check out #` + config.rulesChannel + ` and have a good time!`);
  if (!member.roles.has(config.defaultRole)) {
	  member.addRole(config.defaultRole).catch(console.error);
  } */
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on('messageReactionAdd', (reaction, user, message) => {
	//reaction add code for later
});

client.on('messageReactionRemove', (reaction, user, message) => {
	//reaction removal code for later
});


client.login(process.env.DISCORD_BOT_TOKEN);