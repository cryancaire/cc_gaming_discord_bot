exports.run = (client, message, args) => {
	const config = require("../conf.json");
	const smmChanName = config.smmChannelName;
    message.channel.send(
{
  "embed": {
    "color": 4968170,
    "footer": {
      "text": "©CC Gaming 2018 "
    },
    "fields": [
        {
        "name": "Super Mario Maker Commands",
        "value": "These commands are to be used in '" + smmChanName + "' only.\n```!open\nCan be used by the Admin to open the queue.\n\n!close\nCan be used by the Admin to close the queue.\n\n!add xxxx-xxxx-xxxx-xxxx\nCan be used by anyone to submit a level to the queue.\n\n!remove xxxx-xxxx-xxxx-xxxx\nCan be used by anyone to remove your level from the queue.\n\n!q\nCan be used by anyone to view the queue.```"
       },
       {
         "name": "Misc Commands",
         "value": "Uncategorized commands here.\n```!tweet\nReturns: Link to CC Gaming's latest tweet or retweet\n\n!time\nUsage: !time -6\nReturns: 'The time in UTC-6 is 2018-1-17 12:34:46'\nUsage: !time corey\nReturns: Whatever time it is for Corey at the time.\n\nUsage: !youtuber\nReturns: Specific info about the youtuber command.```"
       }
    ]
  }
});
}