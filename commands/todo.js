client.on('message', async message => {
    const todo = async() => {
        if (!args) return message.reply("you must type something todo!")
            message.channel.send({embed: {
                color: 6329542,
                title: "New todo item!",
                thumbnail: {
                  url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
                },
                fields: [{
                    name: "**Needs to be done:**",
                    value: message.content.slice(commandprefix.length + 4),
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: message.author.displayAvatarURL,
                  text:  message.author.tag
                }
              }   
            })
         }
    
    exports.todo = todo
})