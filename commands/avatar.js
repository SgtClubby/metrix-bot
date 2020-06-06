client.on('message', async message => {
    var avatarblue = "6329542"
    const avatar = () => {
        if (!message.mentions.users.size) {
            return message.channel.send({embed: {
              color: avatarblue,
              author: {
                name: "",
                icon_url: ""
              },
              title: "",
              image: {
                url: `${message.author.displayAvatarURL}`,
              },
            }   
          })
        } 
        
          const avatarList = message.mentions.users.map(user => {
            return `${user.displayAvatarURL}`
          })
          avatarList.forEach(avatarCommand => {
            message.channel.send({embed: {
              color: avatarblue,
              author: {
                name: "",
                icon_url: ""
              },
              title: ``,
              image: {
                url: `${avatarCommand}`,
               },
              }   
            })
          })
        }
    exports.avatar = avatar
    })