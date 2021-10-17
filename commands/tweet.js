exports.run = (client, message, args) => {
	const https = require('https');
	https.get('https://decapi.me/twitter/latest_url?name=@cryancaire', (resp) => {
		let data = '';
 
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
	 
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(data);
			message.channel.send(data);
		});
	 
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}