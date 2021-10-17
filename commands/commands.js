exports.run = (client, message, args) => {
    message.channel.send(
{
  "embed": {
    "color": 4968170,
    "footer": {
      "text": "©CC Gaming 2018 "
    },
    "fields": [
       {
         "name": "Misc Commands",
         "value": "Uncategorized commands here.\n```!tweet\nReturns: Link to CC Gaming's latest tweet or retweet\n\n!time\nUsage: !time -6\nReturns: 'The time in UTC-6 is 2018-1-17 12:34:46'\nUsage: !time corey\nReturns: Whatever time it is for Corey at the time.\n\nUsage: !youtuber\nReturns: Specific info about the youtuber command.```"
       }
    ]
  }
});
}