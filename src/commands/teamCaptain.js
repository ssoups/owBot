const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('teamcaptain')
        .setDescription('Generates 2 random team capitans!'),
    async execute(interaction) {

        var users = []
        try {
            // Finds all users in vc => put users in user array
            message.member.voice.channel.members.each(member => {
                //users.push(`<@${member.user.id}>`) // Ping
                users.push(`${member.user.username}`) // Not Ping
            })
        } catch (error) {
            return message.channel.send("You are currently not in a VC!")
        }

        if (users.length <= 3) return message.channel.send("There are currently too little people!");

        var randomNum1 = Math.floor(Math.random() * users.length)
        var randomNum2 = Math.floor(Math.random() * users.length)

        while (randomNum1 === randomNum2 || (randomNum1 == undefined || randomNum2 == undefined)) randomNum2 = Math.floor(Math.random() * users.length)

        interaction.reply(`The team captains will be: ${users[randomNum1]} and ${users[randomNum2]}`)
    }
}