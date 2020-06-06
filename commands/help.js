client.on('message', async message => {
    const help = () => {
        message.channel.send({embed: {
            color: 6329542,
            author: {
              name: "",
              icon_url: ""
            },
            title: "Commands",
            url: "",
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/694507739292106843/711564085124268143/1231-01.jpg',
            },
            fields: [{
                name: "**Available commands:**",
                value: commandprefix + "serverinfo \n" + commandprefix + "usage \n" + commandprefix + "help \n" + commandprefix + "avatar \n" + commandprefix + "prefix \n" + commandprefix + "poll \n",
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:  message.author.tag
            }
          }   
        })
      };
    exports.help = help;
    })