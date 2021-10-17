exports.run = (client, message, args) => {
	const config = require("../conf.json");
	
	if(message.author.id !== process.env.DISCORD_OWNER_ID) { 
		console.log("not authorized");
		return;
	}
	
	const user = message.mentions.users.first();
	const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
	if (!amount) return message.reply('Must specify an amount to delete!');
	if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
		message.channel.fetchMessages({
			limit: amount,
		}).then((messages) => {
			if (user) {
				const filterBy = user ? user.id : Client.user.id;
				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
			}
	 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	});
}