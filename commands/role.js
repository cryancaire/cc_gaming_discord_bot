exports.run = (client, message, args) => {
//self assign roles
//!giveme role
	const config = require("../conf.json");
	const botChannelName = config.botChannelName;
	
	 const whatChannel = message.channel.id;
	 if (whatChannel == config.botChannel) {
	 //correct channel to use
	} else {
		//not allowed to use these commands here
		console.log('Wrong channel.');
		return;
	}
	
	var theRoles = [
		['crafters', '375671141060182016', 'Access to the Minecraft channel'],
		['mariomakers', '506228220602089482', 'Access to the Mario Maker channels'],
		['developers', '506250420310769684', 'Access to the developers channel'],
		['spoilers', '507549095641088010', 'Access to the spoilers channel']
	];
	
	var roleName;
	var roleID;
	var roleList = "";
	
	var whatMode = args[0];
	var whichRole = args[1];
	
	if (whatMode === "list") {
		//get the list of roles
		for (j=0; j < theRoles.length; j++) {
			roleList = roleList + theRoles[j][0] + " - " + theRoles[j][2] +"\n";
		}
		    message.channel.send(
			{
			  "embed": {
				"color": 4968170,
				"footer": {
				  "text": "©CC Gaming 2018 "
				},
				"fields": [
					{
					"name": "Command Structure",
					"value": "These commands are to be used in '" + botChannelName + "' only.\n```!role [add/remove] [rolename]\nCan be used add or remove one of the below roles from yourself.```"
				   },
				   {
					 "name": "Assignable Roles",
					 "value": "```" + roleList + "```"
				   }
				]
			  }
			});
	
	} else {
	
		if (whichRole) {
			//do the role stuff
			
			//get the list of roles
			for (i=0; i < theRoles.length; i++) {
				if (whichRole === theRoles[i][0]) {
					//console.log('Role name: ' + theRoles[i][0] + ' Role id: ' + theRoles[i][1]);
					roleID = theRoles[i][1];
					roleName = theRoles[i][0];
				}
			}
			
			//console.log(roleName);
			
			if (!roleID) {
				message.reply(" you specified an invalid role!");
			} else {
				
				if(message.member.roles.has(roleID)) {
					if (whatMode === 'add') {
						//dont assign role
						message.reply('you already had the ' + roleName + ' role. No need to add.');
					} else if (whatMode === 'remove') {
						//remove role
						message.reply(' removing the ' + roleName + ' role from you now.');
						message.member.removeRole(roleID);
					} else {
						message.reply('error 1');
					}
				} else {
					
					if (whatMode === "add") {
						//assign role
						message.reply('I am assigning you the ' + roleName + ' role now.');
						message.member.addRole(roleID);
					} else if (whatMode === "remove") {
						//user doesnt have role, notify and do nothing
						message.reply('you didnt have the ' + roleName + ' role. No need to remove.');
					} else {
						message.reply('error 2');
					}
				}
			}
		} else {
			//didnt include a role!
			message.reply(' you didnt specify a role!');
		}
		
	}

}