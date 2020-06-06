client.on('message', async message => {
  const info = () => {
      {
          message.channel.send({embed: {
            color: 6329542,
            author: {
              name: "Some info about me!",
              icon_url: ""
            },
            description: `Hello! I am Metrix! \n Version: A0.7.5 \n My owner and developer is Clomby#1466 \n \n For my command list, use \n ${commandprefix}help`,
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/694507739292106843/711564085124268143/1231-01.jpg',
            },
            title: "",
            url: "",
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:  message.author.tag
          }
        }
      });
      }
    };
exports.info = info;
})