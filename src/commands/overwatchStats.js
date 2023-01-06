const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");
const { data } = require('./commands');
const commands = require('./commands');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Returns player stats!')
        .addStringOption(option =>
            option.setName("device")
                .setDescription('Enter your device!')
                .setRequired(true)
                .addChoices(
                    { name: 'PC', value: 'pc' },
                    { name: 'Console', value: 'console' }
                ))

        .addStringOption(option =>
            option.setName("battletag")
                .setDescription('Enter your Battle.net tag! ex. copypasting#1216')
                .setRequired(true)),


    async execute(interaction) {
        const device = interaction.options.getString('device');
        const tag = interaction.options.getString('battletag').split("#")[1];
        const username = interaction.options.getString('battletag').split("#")[0];

        // API https://overfast-api.tekrop.fr/#section/W.I.P.
        async function main() {
            await fetch(`https://overfast-api.tekrop.fr/players/${username}-${tag}`)
                .then(res => res.json())
                .then(json => {
                    //console.log(json) 
                    if(json.error) return playerNotFound();
                    if (json.summary.privacy == 'private') return privateAccount();
                    if(json.stats[device] == null) return noStats();

                    var quickStat = json.stats.pc.quickplay.career_stats['all-heroes'][1].stats; // Stats average for quickplay
					var compStat = json.stats.pc.competitive.career_stats['all-heroes'][1].stats; // Stats average for comp

                    const playerStats = new EmbedBuilder()
                        .setColor([30, 227, 99])
                        .setTitle(`${username}'s Statistics`)
                        .setThumbnail(json.summary.avatar)
                        .addFields(
                            {name: "Title", value: json.summary.title, inline: true},
                            {name: "End. Level", value: `${json.summary.endorsement.level}`, inline: true},
                            {name: "Avg. Damage", value:`${(Math.round(quickStat[5].value + compStat[5].value) / 2)}`, inline: true},
                            {name: "Avg. Healing", value:`${(Math.round(quickStat[9].value + compStat[9].value) / 2)}`, inline: true},
                        )   
                        .setTimestamp();

                    interaction.reply({ embeds: [playerStats] });
                    

                    function privateAccount() {
                        const private = new EmbedBuilder()
                            .setColor([255, 0, 0])
                            .setTitle(`Account is private!`)
                            .setDescription('Make sure the account you are searching up is set to __public__.')
                            .addFields({ name: "HOW TO SET ACCOUNT TO PUBLIC", value: "1. Once you’re logged onto Overwatch, go to the game menu and select **Options** \n2. Choose the **Social tab**\n3. Find the **Career Profile Visibility** setting\n4. Clicking the right or left arrows to select **Public**." })
                        interaction.reply({ embeds: [private] });
                    }

                    function playerNotFound(){
                        const notFound = new EmbedBuilder()
                            .setColor([255, 0, 0])
                            .setTitle(`Player Not Found`)
                            .setDescription('Make sure to check the BattleTag is correct and has the proper capitalization!')
                        interaction.reply({ embeds: [notFound] });
                    }

                    function noStats(){
                        const noStats = new EmbedBuilder()
                            .setColor([255, 0, 0])
                            .setTitle("No Data Found")
                            .setDescription("Make sure the device selected is correct!")
                            interaction.reply({ embeds: [noStats] });
                    }
                
                })




        }



        main();




        return
    },
};