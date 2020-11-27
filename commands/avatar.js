client.on('message', async message => {
    const avatar = () => {
        if (!message.mentions.users.size) {
            return message.channel.send({embed: {
              color: 8103630,
              author: {
                name: "",
                icon_url: ""
              },
                title: "",
              image: {
                url: `${message.author.avatarURL()}?size=1024`,
              },
            }   
          })
        } 
        
          const mentionedUsers = message.mentions.users.map(user => {
            return `${user.displayAvatarURL()}`
          })
          mentionedUsers.forEach(avatarUrl => {
            message.channel.send({embed: {
              color: 6329542,
              image: {
                url: `${avatarUrl}?size=1024`,
               },
              }   
            })
          })
        }
    exports.avatar = avatar
    })