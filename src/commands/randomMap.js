const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randommap')
		.setDescription('Gives a random Overwatch Map!'),
	async execute(interaction) {
        
        const gamemodes = ['control', 'escort', 'hybrid', 'push']
        const control = [
            'Busan',
            'Ilios',
            'Lijiang Tower',
            'Nepal',
            'Oasis'
        ]
        const escort = [
            "Dorado",
            "Circuit Royal",
            "Havana",
            "Junkertown",
            "Rialto",
            "Route 66",
            "Watchpoint: Gibraltar"
        ]
        const hybrid = [
            'Blizzard World',
            'Eichenwalde',
            'Hollywood',
            "King's row",
            'Midtown',
            'Numbani',
            'Paraiso'
        ]
        const push = [
            'Colosseo',
            'Esperanca',
            'New Queen Street'
        ]
    
        
        let randomGame = gamemodes[Math.floor(Math.random() * gamemodes.length)]
        
        if(randomGame === "control"){
            let map = control[Math.floor(Math.random() * control.length)]
    
            const controlEmbed = new EmbedBuilder()
            .setColor([230, 64, 64])
            .setTitle("CONTROL")
            .setDescription(`Your random map is ***${map}***!`)
            .setTimestamp()
    
            return interaction.reply({embeds: [controlEmbed]})
        }
        else if(randomGame === "escort"){
            let map = escort[Math.floor(Math.random() * control.length)]
            
            const escortEmbed = new EmbedBuilder()
            .setColor([230, 169, 64])
            .setTitle("ESCORT")
            .setDescription(`Your random map is ***${map}***!`)
            .setTimestamp()
    
            return interaction.reply({embeds: [escortEmbed]})
        }
        else if(randomGame === "hybrid"){
            let map = hybrid[Math.floor(Math.random() * control.length)]
    
            const hybridEmbed = new EmbedBuilder()
            .setColor([130, 230, 64])
            .setTitle("HYBRID")
            .setDescription(`Your random map is ***${map}***!`)
            .setTimestamp()
    
            return interaction.reply({embeds: [hybridEmbed]})
        }
        else if(randomGame === "push"){
            let map = push[Math.floor(Math.random() * control.length)]
    
            const pushEmbed = new EmbedBuilder()
            .setColor([64, 153, 230])
            .setTitle("PUSH")
            .setDescription(`Your random map is ***${map}***!`)
            .setTimestamp()
    
            return interaction.reply({embeds: [pushEmbed]})
        }
	},
};