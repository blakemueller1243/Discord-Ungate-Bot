module.exports= {
    name: 'setupbot',
    description: "first time setup for each server",
    execute: async (message, connection, prefix, guildCommandPrefixes) =>{
        setTimeout(() => {message.delete();}, 3000);
        if (message.content.toLowerCase().startsWith(prefix + 'changeprefix')){
            if (message.member.id === message.guild.ownerID) {
                var guild = message.guild
                const [cmdName, newPrefix ] = message.content.split(" ");
                if (newPrefix) {
                    try {
                        await connection.query(
                        `UPDATE ServerConfig SET cmdPrefix = '${newPrefix}' WHERE serverId= '${message.guild.id}'`
                    );
                    guildCommandPrefixes.set(message.guild.id, newPrefix);
                    message.channel.send(`Updated guild prefix to ${newPrefix}`).then(sentMessage => {sentMessage.delete({ timeout: 3000}); });
                }catch(err) {
                    console.log(err);
                    message.channel.send(`Failed to update guild prefix to ${newPrefix}`).then(sentMessage => {sentMessage.delete({ timeout: 3000}); });
                }
                }else {
                    message.channel.send('You need to input a prefix to change to!').then(sentMessage => {sentMessage.delete({ timeout: 3000}); });
                }
            }else {
                message.channel.send('You do not have permissions to do this command!').then(sentMessage => {sentMessage.delete({ timeout: 3000}); });
            }
        }
}}