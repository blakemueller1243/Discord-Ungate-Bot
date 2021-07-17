module.exports= {
    name: 'help',
    description: "list of commands",
    execute(message){
        setTimeout(() => {message.delete();}, 3000)
        message.channel.send('pong').then(sentMessage => {sentMessage.delete({ timeout: 3000}); });
        message.channel.send('Deleting messages soon...').then(sentMessage => {sentMessage.delete({ timeout: 2500}); });
}}