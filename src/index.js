import { Client, GatewayIntentBits, Partials } from 'discord.js'
import config from './config.json' assert {type: 'json'}
import teamSplit from './commands/teamSplit.js';
import teamCaptain from './commands/teamCaptain.js';
import randomGameode from './commands/randomMap.js';
import commands from './commands/commands.js';

const client = new Client({
    intents: [
       GatewayIntentBits.DirectMessages,
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMessages,
       GatewayIntentBits.MessageContent,
       GatewayIntentBits.GuildMembers,
       GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel],
 });
 
 client.once('ready', () => {
    console.log("Ready!");
 }); 

client.on('messageCreate', message => {
   console.log(message.content)
   if(message.content.includes(`<@798318913024163851>`)) message.channel.send(`My prefix is \`${config.prefix}\``)
   if(message.author.bot || message.content.includes(`${config.prefix}`) == false) return;

   var req = message.content.toLowerCase().split(" ")[1];

    if(req === 'ts' || req === "teamsplit") teamSplit(message, message.content.toLowerCase().split(" ")[2]);
    else if(req === "tc" || req === "teamcaptain") teamCaptain(message);
    else if(req === "commands") commands(message);
    else if(req === "rm" || req === "randommap"){
      randomGameode(message)
    }
})

client.login(config.token2);