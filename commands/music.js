exports.run = (client, message, args) => {
	var VC = message.member.voiceChannel;
    var whatSong = args[1];
    
    if (!VC)
        return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
		VC.join()
        .then(connection => {
            if (whatSong) {
                const dispatcher = connection.playFile('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                dispatcher.on("end", end => {VC.leave()});
            } else {
                const dispatcher = connection.playFile(whatSong);
                dispatcher.on("end", end => {VC.leave()});
            }
            
        })
        .catch(console.error);
		
		
}