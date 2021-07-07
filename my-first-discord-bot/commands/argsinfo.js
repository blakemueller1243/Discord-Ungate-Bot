const Discord = require('discord.js');

module.exports= {
    name: 'argsinfo',
    description: "test arugment command",
    execute(message, command, args){
        if (!args.length){

            return message.channel.send(`You didnt provide any arguments, ${message.author}!`);

        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);

    }
}