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
                url: `${message.author.displayAvatarURL()}?size=1024`,
              },
            }   
          })
        } 
        
          const avatarList = message.mentions.users.map(user => {
            return `${user.displayAvatarURL()}`
          })
          avatarList.forEach(avatarCommand => {
            message.channel.send({embed: {
              color: 6329542,
              image: {
                url: `${avatarCommand}?size=1024`,
               },
              }   
            })
          })
        }
    exports.avatar = avatar
    })