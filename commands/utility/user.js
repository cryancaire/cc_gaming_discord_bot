const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    enabled: false,
    data: new SlashCommandBuilder().setName('user')
        .setDescription('Displays some useful info about the user'),
    async execute (interaction) {
        await interaction.reply({
            content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`, 
            ephemeral: true
        });
    }
};