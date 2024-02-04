const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    enabled: false,
    data: new SlashCommandBuilder().setName('poll')
        .setDescription('Set up a poll'),
    async execute (interaction) {
        const message = await interaction.reply({
            content: `poll coming soon`, fetchReply: true
        }).then(replyMessage => {
            console.log(replyMessage)
            const collectorFilter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name);
            };
            replyMessage.awaitReactions({ filter: collectorFilter, max: 1, time: 10_000, errors: ['time'] })
            .then (r => {
                console.log(r)
            }).catch(e => {
                console.log("error", e)
            })
        });

    }
};