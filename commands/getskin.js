const FastAverageColor = require('fast-average-color');
const request = require('request')

client.on('message', async message => {
    const getmcskin = () => {
        var getuuid = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`
if (!args.length) {
  return message.channel.send(`Please enter a username, ${message.author}!`);
}

request(getuuid, function(err, response, body) {
  if(err) {
      console.log(err);
      return message.reply('Error getting skin data');
  }
  body = JSON.parse(body);
    const UUID = body.id
    const mcname = body.name

var getskin = `https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`

request(getskin, function(err, response, body) {
  if(err) {
      console.log(err);
      return message.reply('Error getting skin data');
  }
  body = JSON.parse(body);
    var data = `${body.properties[0].value}`
    var buff = new Buffer(data, 'base64');
    var text = buff.toString('ascii');
    console.log(text);

    skins = JSON.parse(text)
    skins.skinurl = skins.textures.SKIN.url
    
    console.log(skins.skinurl)
      message.channel.send({embed: {
        color: 6329542,
        author: {
          name: "",
          icon_url: ""
        },
        description: `Minecraft skin render:`,
        image: {
          url: `https://visage.surgeplay.com/full/${UUID}`,
        },
        thumbnail: {
            url: skins.skinurl,
          },
        title: `${mcname}`,
        url: `https://namemc.com/${mcname}`,
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL,
          text:  message.author.tag
      }
    }
  })

  }); 
}); 
    };
    
    exports.getmcskin = getmcskin;
    })
