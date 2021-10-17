exports.run = (client, message, args) => {
    message.channel.send({
  "embed": {
    "color": 4968170,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/403044060736258048/403044117657157633/coreycaire_200.png",
      "text": "CC Gaming"
    },

    "author": {
      "name": "Cool Bot",
      "icon_url": "https://cdn.discordapp.com/attachments/403044060736258048/403044117657157633/coreycaire_200.png"
    },
    "fields": [
       {
        "name": "!open",
        "value": "Can be used by the Admin to open the queue."
       },
       {
        "name": "!close",
        "value": "Can be used by the Admin to close the queue."
       },
       {
        "name": "Super Mario Maker Commands",
        "value": "These commands are to be used in <SMM channel> only."
      },
      {
        "name": "!add xxxx-xxxx-xxxx-xxxx",
        "value": "Can be used by anyone to submit a level to the queue."
      },
      {
        "name": "!remove xxxx-xxxx-xxxx-xxxx",
        "value": "Can be used by anyone to submit a level to the queue."
      },
      {
        "name": "!q",
        "value": "Can be used by anyone to view the queue."
      }
    ]
  }
});
}