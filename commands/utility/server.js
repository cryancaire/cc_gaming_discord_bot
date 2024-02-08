const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    enabled: false,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const serverInfoEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('CCGaming a.k.a Corey Caire')
        .setURL('https://coreycaire.dev')
        .setAuthor({ name: `${interaction.guild.name}`, iconURL: 'https://www.coreycaire.dev/assets/images/user.png', url: 'https://coreycaire.dev' })
        .setDescription('Professional Angular developer by day, gamer by night.')
        .setThumbnail('https://www.coreycaire.dev/assets/images/user.png')
        .addFields(
            { name: '\u200B', value: ' ' },
            { name: 'Some server Insites', value: ' ' },
            { name: ' ', value: `Total Member Count: ${interaction.guild.memberCount}` },
            { name: '\u200B', value: ' ' },
        )
        .setTimestamp()
        .setFooter({ text: 'Bot and Server Created by Corey Caire', iconURL: 'https://www.coreycaire.dev/assets/images/user.png' });
        await interaction.reply({ embeds: [serverInfoEmbed]})
		//await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};