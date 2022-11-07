import { EmbedBuilder } from "@discordjs/builders";

export default function randomRole(message){

    const roles1 = ["Support", "Support", "Tank", "DPS", "DPS"];
    const roles2 = ["Support", "Support", "Tank", "DPS", "DPS"];
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
        return message.channel.send("You are currently not in a VC!")
    }

    if(users.length < 2) return message.channel.send("There are too little people!");

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

    return message.channel.send({embeds:[ embedTeam1, embedTeam2 ]});
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