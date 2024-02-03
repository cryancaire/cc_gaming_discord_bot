const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://coreycaire.dev')
        .setAuthor({ name: `${interaction.guild.name}`, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://coreycaire.dev' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        .setFooter({ text: 'Bot and Server Created by Corey Caire', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        await interaction.reply({ embeds: [exampleEmbed]})
		//await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};