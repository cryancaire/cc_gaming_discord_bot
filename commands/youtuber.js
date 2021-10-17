exports.run = (client, message, args) => {
	//this gets our config vars
	const config = require("../conf.json");
	const botChannelName = config.botChannelName;
	
	//grab any arguments... we only care about the first 2 though
	var theArg = args[0];
	var idType = args[1];
	
	 const whatChannel = message.channel.id;
	 if (whatChannel == config.botChannel) {
	 //correct channel to use
	} else {
		//not allowed to use these commands here
		console.log('Wrong channel.');
		return;
	}	
	
	if (!theArg) {
			//if we dont have an argument, just show a general "how to"
		    message.channel.send(
			{
			  "embed": {
				"color": 4968170,
				"footer": {
				  "text": "©CC Gaming 2018 "
				},
				"fields": [
					{
					"name": "Youtuber Command Help",
					"value": "This command will only work in '" + botChannelName + "'.\n```!youtuber name [channelname]\n!youtuber [channelid]```"
				   }
				]
			  }
			});	
		return;
	}
	
	if (theArg === "name")
	{
		//arguments are essentially backward... lets fix that.
		var tempID = idType;
		var tempIDType = "forUsername";
		idType = tempIDType;
		theArg = tempID;
	}
	
	//what did we put in the SECOND argument?
	if (!idType) {
		idType = "id";
	} else if (idType == "id") {
		idType = "id";
	} else {
		idType = "forUsername";
	}

	
	var request = require('request');
	// Replace id and key with the accountId and an API key.
	var request = require('request');
	// Replace id and key with the accountId and an API key.
	//need to put this in config.json later
	var id = "UCPvyE-u1wQR_xLAV7V0bj1w";
	var key = config.ytAPIKey;
	var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&" + idType + "=" + theArg + "&key=" + key;

	request({
		method: 'GET',
		url: url
	}, function (err, response, text) {
		if (err) {
			//error? nani?
			return;
		}

		try {
			//can technically parse the json even with a problem
			//so had to include the title var, cuz that one will spit out
			//the error we need!
			var json = JSON.parse(text);
			var chanName = json.items[0].snippet.title;
		} catch (e) {
			///Main error caught here... basically it cant correctly get the title... 
			if (e instanceof TypeError) {
				message.channel.send("There was an error! Please check that you are using a correct channel ID or name");
				return;
			} else {
				message.channel.send("There was an error!");
				return;
			}
		}
		
		
		//let's grab the appropriate information here! (trying to format numbers but no luck! :sadpanda:)
		var chanSubs = json.items[0].statistics.subscriberCount.toLocaleString('en');
		var chanThumb = json.items[0].snippet.thumbnails.default.url;
		var chanDesc = json.items[0].snippet.description;
		var chanViews = json.items[0].statistics.viewCount.toLocaleString('en');
		var chanVids = json.items[0].statistics.videoCount.toLocaleString('en');
		
		//Send a prettified response card!
		message.channel.send(
			{
			  "embed": {
				"color": 4968170,
				"footer": {
				  "text": "©CC Gaming 2018 "
				},
				"thumbnail": {
				  "url": chanThumb
				},
				"fields": [
					{
					"name": chanName,
					"value": chanDesc + "\n"
				   },
				   {
					 "name": "Stats",
					 "value": "```Subscribers: " + chanSubs + "\nViews: " + chanViews + "\nTotal Videos: " + chanVids + "```"
				   }
				]
			  }
			});
	});

}