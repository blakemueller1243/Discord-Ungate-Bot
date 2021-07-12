const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const util = require('util');
const mysql = require('mysql2');
const db = require('../database/db');
require('dotenv').config();

///Prefix for commands
const prefix = '!'

///Token for discord bot please hide
var token = process.env.DT;

///Bot is online sent to command prompt
bot.on('ready', () =>{
    console.log('this bot in online!');
})

///allowing the script to see files from the commands folder
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}



///Message Handler
bot.on('message', message=>{
    ///start messaging splicing to enable multi argument commands
    if(!message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    ///basic ping pong test command
    if(command === 'ping'){
        bot.commands.get('ping').execute(message);
    }   
    ///arguments test
    else if (command === 'argsinfo'){
        bot.commands.get('argsinfo').execute(message, command, args)
    }
    ///message command list
    else if (command === 'autoungate'){
        bot.commands.get('autoungate').execute(message, args, Discord);
    }
});


///Bot login. uses token from variable at the top
bot.login(token);