const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Replies with useable commands!'),
	async execute(interaction) {
        var commands ="";
        var files = fs.readdirSync("./src/commands");

        files.forEach(command => {
            commands += `[-] ${(command.split(".js"))[0]}\n`;
        });

        const commandEmbed = new EmbedBuilder()
        .setColor([30, 227, 99])
        .setTitle("All Commands Found")
        .setDescription(`${commands}`)
        .setTimestamp();

		return interaction.reply({embeds: [commandEmbed]});
	},
};