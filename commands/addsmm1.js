exports.run = (client, message, args) => {
const https = require('http');
const userWhoPosted = message.author.username;
 const whatChannel = message.channel.id;
const config = require("../config.json");

 if (whatChannel == config.smmChannel) {
	 //correct channel to use
 } else {
	//not allowed to use SMM commands here
	console.log('Wrong channel.');
	return;
 }
 
https.get('http://warp.world/bot/add?streamer=' + config.warpWorldStreamer + '&submitter=' + userWhoPosted + '&key=0nxBgJK6q44IEv92&levelcode=' + args[0], (resp) => {
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