exports.run = (client, message, args) => {

	if(message.member.roles.has('333706064153542677')) {
		message.reply(`You have this role.`);
	  console.log(`Yay, the author of the message has the role!`);
	} else {
		message.reply(`You do not have this role.`);
	  console.log(`Nope, noppers, nadda.`);
	}
}