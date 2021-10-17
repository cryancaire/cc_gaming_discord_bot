exports.run = (client, message, args) => {
	var VC = message.member.voiceChannel;
    if (!VC)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
		VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
		
		
}