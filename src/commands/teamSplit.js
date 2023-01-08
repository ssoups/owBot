const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const funkyAdj = [
    "Goofy",
    "Godly",
    "Stinky",
    "Powerful",
    "Peaceful",
    "Super",
    "Funny",
    "Sleepy",
    "Dead",
    "Undead",
    "Cool",
    "Hip",
    "Annoying",
    "Angry",
    "Empty",
    "Mystical",
    "Floppy"
];
const funkyNoun = [
    "Weebs",
    "Monkeys",
    "Turtles",
    "Habibis",
    "Cucumbers",
    "Penguins",
    "Goofy Goobers",
    "Capybara",
    "Spoons",
    "Forks",
    "Hackers",
    "Masters",
    "Sporks",
    "Sheeps",
    "Geese",
    "Mooses"
];

var tankCharacters = [
    "Dva",
    "Winston",
    "Orisa",
    "Junker Queen",
    "Zarya",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Doomfist",
    "Ball"
];
var dpsCharacters = [
    "Ashe",
    "Mcree",
    "Echo",
    "Genji",
    "Hanzo",
    "Junkrat",
    "Mei",
    "Pharah",
    "Reaper",
    "Sojourn",
    "Soldier",
    "Sombra",
    "Symmetra",
    "Torbjorn",
    "Tracer",
    "Widowmaker",
    "Bastion"
];
var supportCharacters = [
    "Ana",
    "Baptiste",
    "Brigette",
    "Kiriko",
    "Lucio",
    "Mercy",
    "Moira",
    "Zenyatta"
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teamsplit')
		.setDescription('Sends 2 randomly generated team of people inside your VC!')
        .addStringOption(option => 
            option.setName("type")
            .setDescription('Enter a type of teamsplit!')
            .setRequired(true)
            .addChoices(
                { name: 'teamsplit', value: 'teamsplit'},
                { name: 'randomcharacter', value: 'randomchar'},
                { name: 'randomrole', value: 'randomrole'}
            )),
	async execute(interaction) {
        const type = interaction.options.getString('type');

        console.log(type)

		if(type == null || type == 'ts' || type == 'teamsplit') return teamSplit(interaction)
		else if(type == 'rc' || type == 'randomchar') return randomCharacter(interaction)
		else if(type == 'rr' || type == 'randomrole') return randomRole(interaction)
		return interaction.reply('Command not found!');
	},
};

function teamSplit(message){

    
    var users = [];
    var team1 = "";
    var team2 = "";

    try {
        // Finds all users in vc => put users in user array
        message.member.voice.channel.members.each(member=>{
            //users.push(`<@${member.user.id}>`) // Ping
            users.push(`${member.user.username}`); // Not Ping
        })
    } catch (error) {
        return message.reply("try joining the vc first <:goofy:1032151135773007942> ");
    }

    if(users.length < 2) return message.reply("you need more people <:weird:941934653089153024>");

    // Scrambles team 
    if(users.length % 2 == 1) users.push("[ Robot ]");
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }

    while(users.length != 10) users.push("[ Robot ]");

    // Divides users into 2 teams
    for (let i = 0; i < users.length; i++) {
        if(i % 2 == 0) team1 += `${users[i]} \n`;
        else team2 += `${users[i]} \n`;
    }

    const embedTeam1 = new EmbedBuilder()
    .setColor([252, 73, 61])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team1}`)
    .setTimestamp()

    const embedTeam2 = new EmbedBuilder()
    .setColor([140, 167, 255])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team2}`)
    .setTimestamp()

    return message.reply({embeds: [embedTeam1, embedTeam2]});
}


function randomRole(message){

    const roles1 = ["Support", "Support", "Tank", "DPS", "DPS"];
    const roles2 = ["Support", "Support", "Tank", "DPS", "DPS"];
    var users = [];
    var team1 = "";
    var team2 = "";

    try {
        // Finds all users in vc => put users in user array
        message.member.voice.channel.members.each(member=>{
            //users.push(`<@${member.user.id}>`) // Ping
            users.push(`${member.user.username}`); // Not Ping
        })
    } catch (error) {
        return message.reply("try joining the vc first <:goofy:1032151135773007942> ")
    }

    if(users.length < 2) return message.reply("you need more people <:weird:941934653089153024>");

    // Scrambles team 
    if(users.length % 2 == 1) users.push("[ Robot ]")
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    };

    while(users.length != 10) users.push("[ Robot ]");
    
    // Divides users into 2 teams
    for (let i = 0; i < users.length; i++) {
        if(i % 2 == 0) team1 += `${users[i]} - ${randomRoleGen(roles1)} \n`;
        else team2 += `${users[i]} - ${randomRoleGen(roles2)} \n`;
    };

    const embedTeam1 = new EmbedBuilder()
    .setColor([252, 73, 61])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team1}`)
    .setTimestamp()

    const embedTeam2 = new EmbedBuilder()
    .setColor([140, 167, 255])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team2}`)
    .setTimestamp()

    return message.reply({embeds:[ embedTeam1, embedTeam2 ]});
}


function randomRoleGen(rolelist){
    var ranNum2 = Math.floor( Math.random() * rolelist.length);
    var role 
    while(ranNum2 < 0){
        ranNum2 = Math.floor( Math.random() * rolelist.length);
    }
    role = rolelist[ranNum2]
    rolelist.splice(ranNum2,1)
    return role;
}


function randomCharacter(message) {

    var team1 = "";
    var team2 = "";
    var users = [];
    var roles1 = ["Support", "Support", "Tank", "DPS", "DPS"];
    var roles2 = ["Support", "Support", "Tank", "DPS", "DPS"];
    


    function randomCharGen(rolelist){
        var ranNum2 = Math.floor( Math.random() * rolelist.length);
        var role, character;
    
        while(ranNum2 < 0){
            ranNum2 = Math.floor( Math.random() * rolelist.length);
        }

        role = rolelist[ranNum2]
        rolelist.splice(ranNum2,1)
    
        if(role === "Support"){
            var randomSupport = Math.floor( Math.random() * supportCharacters.length);
            while(randomSupport < 0){
                randomSupport = Math.floor( Math.random() * supportCharacters.length);
            }
    
            character = `${supportCharacters[randomSupport]} (${role})`
            supportCharacters.splice(randomSupport,1)

        } else if(role === "DPS"){
            var randomDPS = Math.floor( Math.random() * dpsCharacters.length);
            while(randomDPS < 0){
                dpsCharacters = Math.floor( Math.random() * dpsCharacters.length);
            }
    
            character = `${dpsCharacters[randomDPS]} (${role})`
            dpsCharacters.splice(randomDPS,1)

        } else if(role === "Tank"){
            var randomTank = Math.floor( Math.random() * tankCharacters.length);
            while(randomTank < 0){
                randomTank = Math.floor( Math.random() * tankCharacters.length);
            }
    
            character = `${tankCharacters[randomTank]} (${role})`;
            tankCharacters.splice(randomTank, 1)
        }
        
        return character;
    }

    
    try {
        // Finds all users in vc => put users in user array
        message.member.voice.channel.members.each(member=>{
            //users.push(`<@${member.user.id}>`) // Ping
            users.push(`${member.user.username}`); // Not Ping
        });
    } catch (error) {
        return message.reply("try joining the vc first <:goofy:1032151135773007942> ");
    }


    if(users.length < 2) return message.reply("you need more people <:weird:941934653089153024>");

    // Scrambles team 
    if(users.length % 2 == 1) users.push("[ Robot ]");
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }

    while(users.length != 10) users.push("[ Robot ]")

    // Divides users into 2 teams
    for (let i = 0; i < users.length; i++) {
        if(i % 2 == 0) team1 += `${users[i]} - ${randomCharGen(roles1)} \n`;
        else team2 += `${users[i]} - ${randomCharGen(roles2)} \n`;
    }

console.log(team1)

    const embedTeam1 = new EmbedBuilder()
    .setColor([252, 73, 61])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team1}`)
    .setTimestamp()

    const embedTeam2 = new EmbedBuilder()
    .setColor([140, 167, 255])
    .setTitle(`Team ${funkyAdj[Math.floor(Math.random() * funkyAdj.length )]} ${funkyNoun[Math.floor(Math.random() * funkyNoun.length )]}`)
    .setDescription(`${team2}`)
    .setTimestamp()

    return message.reply({embeds: [embedTeam1, embedTeam2]});
}
