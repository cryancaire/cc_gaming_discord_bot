exports.run = (client, message, args) => {
	message.reply(`This command is currently disabled.`);
	return;
	//set prefix
	if(message.author.id !== config.ownerID) { 
		console.log("not authorized");
		return;
	  }
	  
	  //get prefix from command
	  let newPrefix = args[0];
	  
	  //change prefix in memory
	  config.prefix = newPrefix;
	  
	  //now save to file
	  fs.writeFile("../config.jason", JSON.stringify(config), (err) => console.error);
	  
	message.reply(`${args[0]}`);

}