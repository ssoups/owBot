import * as fs from 'fs';
import { EmbedBuilder } from "@discordjs/builders";

export default function commands(message){
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

    return message.channel.send({embeds: [commandEmbed]});
} 