module.exports= {
    name: 'autoungate',
    description: "This command creates an embedded message with information about the asin provided",
    execute(message, args, Discord){
        /// deletes input message from user
        setTimeout(() => {message.delete();}, 3000)

        /// if you dont put in any argument you will get this in return which will guide you in finding amazon ASINS
        if(!args.length){
            return message.channel.send(`${message.author}, please input the items ASIN code from amazon. this can be found by looking at the end of the link for the sku or on the page itself! please retype this command as:
             
            !autoungate (Your items ASIN code minus the brackets)`);

        }
        /// concatenates the link + the asin input from the user to create a link to the product for use in the embed link
        const link = `https://sellercentral.amazon.com/product-search/search?q=${args}`


        /// setting up the embed message. edit settings here.
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#00d9ff')
        .setTitle(`Amazon item: ${args}`)
        .setAuthor('Auto Ungate Bot', 'https://www.pinclipart.com/picdir/big/54-543383_front-open-icon-free-download-png-and-cartoon.png')
        .setURL(link)
        .setDescription('Click the link above and apply to sell as New and enjoy your free ungate 😁')
        .addFields(
            {name: 'Asin', value: `${args}`, inline: true},
            {name: '\u200B', value: '\u200B', inline: true},
            {name: 'Found By:',value: `${message.author}`, inline: true },
        )

    
        message.channel.send(newEmbed);
    }
}