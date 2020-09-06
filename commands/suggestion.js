client.on('message', async message => {
    const suggestion = async() => {
        if (!args[0]) {
        return message.channel.send(`You must have a suggestion, ${message.author}!`)
        }
        else {
            message.channel.send({embed: {
                color: 6329542,
                title: "New suggestion!",
                thumbnail: {
                  url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
                },
                fields: [{
                    name: "**Needs to be added or improved:**",
                    value: message.content.slice(commandprefix.length + 10),
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: message.author.displayAvatarURL(),
                  text:  message.author.tag
                }
              }   
            })
           }
         }
    
    exports.suggestion = suggestion
})