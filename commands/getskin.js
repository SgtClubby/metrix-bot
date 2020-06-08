const FastAverageColor = require('fast-average-color')
const request = require('request')

client.on('message', async message => {
    const getmcskin = () => {
        var getuuid = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`
if (!args.length) {
  return message.channel.send(`Please enter a username, ${message.author}!`)
}
message.channel.startTyping()
request(getuuid, function(err, response, body) {
  if(err) {
      console.log(err)
      message.channel.stopTyping()
      return message.reply('Error getting skin data')
  }
  try {
  body = JSON.parse(body)
  } catch (e) {
    message.channel.stopTyping()
    return message.channel.send(`Please enter a valid username, ${message.author}`)
  }
    var UUID = body.id
    const mcname = body.name

var getskin = `https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`

request(getskin, function(err, response, body) {
  if(err) {
      console.log(err)
      message.channel.stopTyping()
      return message.reply('Error getting skin data')
  }
  body = JSON.parse(body)
    var data = `${body.properties[0].value}`
    var buff = new Buffer.from(data, 'base64')
    var text = buff.toString('ascii')
    skins = JSON.parse(text)
    try {
      skins.skinurl = skins.textures.SKIN.url
    } catch (e) {
      UUID = '8667ba71b85a4004af54457a9734eed7'
      skins.skinurl = 'https://visage.surgeplay.com/skin/8667ba71b85a4004af54457a9734eed7'
    }
    try {
      skins.slim = skins.textures.SKIN.metadata.model
      if (skins.slim === "slim") {
        model = "slim"
        }
      } catch (e) {
        model = "classic" 
        }

        var fac = new FastAverageColor();
        fac.getColorAsync(`${skins.textures.SKIN.url}`)
        .then(function(color) {
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';

            console.log('Average color', color);
        })
        .catch(function(e) {
            console.log(e);
        });
      message.channel.send({embed: {
        color: 6329542,
        author: {
          name: "",
          icon_url: ""
        },
        description: `Minecraft skin render: \n Skin uses the ${model} model!`,
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
    }).then (message.channel.stopTyping())

  })
})
}  
  exports.getmcskin = getmcskin
})
