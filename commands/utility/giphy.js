const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config()
const { GiphyFetch } = require ('@giphy/js-fetch-api')
const giphy = new GiphyFetch(process.env.GIPHY_API_KEY);

module.exports = {
    enabled: true,
	data: new SlashCommandBuilder()
		.setName('giphy')
		.setDescription('Search Giphy')
        .addStringOption(option =>
			option
				.setName('query')
				.setDescription('What kind of gif are you looking for?')
				.setRequired(true)),
	async execute(interaction) {
        //new random giphy button code
        const filter = i => i.customId === 'newRandom' || i.customId === 'sendGif';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'newRandom') {
                randGif = gifs[Math.floor(Math.random() * gifs.length)];
                buildEmbed(randGif.images.downsized_medium.url);
                await i.update({ embeds: [serverInfoEmbed], 
                    ephemeral: true,
                    components: [row] });
            }

            if (i.customId === 'sendGif') {
                await interaction.followUp({ embeds: [serverInfoEmbed], ephemeral: false, components: []});
            }
        });

        //initial search embed
        const search = interaction.options.getString('query') ?? 'No query provided';
        const { data: gifs } = await giphy.search(search, { sort: 'relevant', limit: 50});
        let randGif = gifs[Math.floor(Math.random() * gifs.length)];
        
        buildEmbed(randGif.images.downsized_medium.url);

        const newRandom = new ButtonBuilder()
			.setCustomId('newRandom')
			.setLabel('Randomize')
			.setStyle(ButtonStyle.Secondary);

        const sendGif = new ButtonBuilder()
			.setCustomId('sendGif')
			.setLabel('Send Giphy')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(newRandom, sendGif);

        await interaction.reply({ 
            embeds: [serverInfoEmbed], 
            ephemeral: true,
            components: [row]
        })


        function buildEmbed(image) {
            return serverInfoEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Giphy search for: ${search}`)
            .setURL(`https://giphy.com/search/${search}`)
            .setTimestamp()
            .setImage(image)
            .setFooter({ text: `Searched by ${interaction.user.username}`});
        }
		//await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};