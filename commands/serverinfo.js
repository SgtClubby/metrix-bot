const request = require('request')
const config = require('../config.json')
var red = 15158332
var green = 6729778 
var statusColor = 0
var colon = false

client.on('message', async message => {
    const serverinfo = () => {
  if (!message.content.startsWith(commandprefix) || message.author.bot) return
  args = message.content.slice(commandprefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

if (!args.length) {
  return message.channel.send(`Provide a server address and port, ${message.author}`)
} 

args.forEach(arg => { 
  if (arg.replace(/[^:]/g, "").length > 1) {
    return message.channel.send(`Provide only 1 colon, ${message.author}`)
  }
  str = arg.replace(':', ' ')
  ip = str.split(/ +/)
})



if (ip[1] === undefined) {
  ip[1] = "25565"
}

 var url = 'http://mcapi.us/server/status?ip=' + ip[0] + '&port=' + ip[1];
  request(url, function(err, response, body) {
    if(err) {
        console.log(err);
        return message.reply('Error getting Minecraft server status...')
    }
    body = JSON.parse(body);
    var status = '*Minecraft server is currently offline*'
    statusColor = red;
      if (body.online) {
          status = 'Minecraft server is **online**  -  '
          statusColor = green;
          if (body.players.now) {
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
            value: ip[0] + ":" + ip[1]
          },
          {
            name: "**Status:**",
            value: status
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL(),
          text:  message.author.tag
      }
    }
  });
});
    };
    exports.serverinfo = serverinfo
    })
