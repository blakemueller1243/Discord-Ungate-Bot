const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const util = require('util');
const mysql = require('mysql2');
const { addConsoleHandler } = require('selenium-webdriver/lib/logging');
let connection;
require('dotenv').config();
const guildCommandPrefixes = new Map();

///Bot is online sent to command prompt
bot.on('ready', () =>{
    console.log('this bot in online!');
    bot.guilds.cache.forEach(guild =>{
        connection.query(
            `SELECT cmdPrefix FROM ServerConfig WHERE serverId = '${guild.id}'`
        ).then(result =>{
            guildCommandPrefixes.set(guild.id, result[0][0]?.cmdPrefix);
        }).catch(err => console.log(err));
    });
});


/// adding a guild to the database upon invite
bot.on('guildCreate', async (guild) => {
    // Guild the user needs to have the role in
    let myGuild = await bot.guilds.fetch(process.env.BOT_GUILD);
    console.log(myGuild);

    // Role that the user needs
    let requiredRole = process.env.PAID_ROLE;
    console.log(requiredRole);

    // Member object of the user in guildA
    let guildOwner = await myGuild.members.fetch(guild.ownerID);

    if (!guildOwner)
      return console.log(`Oops, ${guild.owner} is not a member of your server.`)
    
    //Check if they have the role 
    let ownerHasPaidRole = guildOwner.roles.cache.has(process.env.PAID_ROLE);

    if (ownerHasPaidRole){
      console.log(`Woohoo, ${guildOwner} has the required role`);}
        try {
            /// insert serverid and serverownerid into servers db
        await connection.query(
            `INSERT INTO Servers (serverId, serverOwnerId, paidRole) VALUES ('${guild.id}', '${guild.ownerID}', 1)`
            );
            /// insert server id into serverconfig db
        await connection.query(
            `INSERT INTO ServerConfig (serverId) VALUES ('${guild.id}')`
            );
        }catch(err){
            console.log(err);
    }});
    




///Token for discord bot
(async () => {
    connection = await require('./database/db.js');
    await bot.login(process.env.BOT_TOKEN);
   })();


///allowing the script to see files from the commands folder
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
   const command = require(`./commands/${file}`);
   bot.commands.set(command.name, command);
}



///Message Handler
    bot.on('message', async (message) => {
        const prefix = guildCommandPrefixes.get(message.guild.id);
        console.log('caught message');
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

   ///basic ping pong test command
    if(command === 'help'){
        bot.commands.get('help').execute(message);
    }
    ///basic ping pong test command
    else if(command === 'ping'){
        bot.commands.get('ping').execute(message);
    }
    ///change the servers prefix
    else if(command === 'changeprefix'){
        bot.commands.get('changeprefix').execute(message, connection, prefix, guildCommandPrefixes);
    }   
    ///arguments test
    else if (command === 'argsinfo'){
        bot.commands.get('argsinfo').execute(message, command, args)
    }
    ///message command list
    else if (command === 'autoungate'){
        bot.commands.get('autoungate').execute(message, args, Discord);
    }});
