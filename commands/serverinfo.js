const request = require('request')
const config = require('../config.json')
var red = 15158332
var green = 6729778 
var statusColor = 0

client.on('message', async message => {
    const serverinfo = () => {
    
const user = message.mentions.users.first() || message.author;
 var url = 'http://mcapi.us/server/status?ip=' + config.mcIP + '&port=' + config.mcPort;
  request(url, function(err, response, body) {
    if(err) {
        console.log(err);
        return message.reply('Error getting Minecraft server status...')
    }
    body = JSON.parse(body);
    var status = '*Minecraft server is currently offline*'
    statusColor = red;
      if(body.online) {
          status = 'Minecraft server is **online**  -  '
          statusColor = green;
          if(body.players.now) {
              status += '**' + body.players.now + '** people are playing!'
          } else {
              status += 'Nobody is playing!'
          }
      }
    message.channel.send({embed: {
        color: statusColor,
        author: {
          name: "",
          icon_url: ""
        },
        title: "Minecraft Server Status",
        url: "",
        fields: [{
            name: "**Server:**",
            value: config.mcIP + ":" + config.mcPort
          },
          {
            name: "**Status:**",
            value: status
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL,
          text:  message.author.tag
      }
    }
  });
});
    };
    exports.serverinfo = serverinfo
    })
