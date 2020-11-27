const Discord = require("discord.js")
const req = require('request')
client.on('message', async message => {
    const api = () => {
        switch (args[0]) {
            case "status":
                const chat       =      `http://localhost:3000`
                const api        =      `http://localhost:4242/api`
                const website    =      `http://localhost:443/home`
                const cdn        =      `http://localhost:443/content`
                let chatstatus;
                let apistatus
                let websitestatus

                  req(api, function (err, response, body) {
                    if (err) {
                      apistatus  = "`Offline!`"
                    } else if (response) {
                      apistatus = "`Online!`"
                    }
                
                  req(chat, function (err, response, body) {
                    if (err) {
                      chatstatus = "`Offline!`"
                    } else if (response) {
                      chatstatus = "`Online!`"
                    }
                
                  req(website, function (err, response, body) {
                    if (err) {
                      websitestatus = "`Offline!`"
                    } else if (response) {
                      websitestatus = "`Online!`"
                    }
                    
                  req(cdn, function (err, response, body) {
                    if (err) {
                      websitestatus = "`Offline!`"
                    } else if (response) {
                      websitestatus = "`Online!`"
                    }
              
                const statusembed = new Discord.MessageEmbed()
                .setColor('#6094C6')
                .setTitle('Metrix Network Status')
                .setURL('https://metrix.pw/')
                .setThumbnail('https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png')
                .addFields(
                  { name: 'API:', value: apistatus, inline: true },
                  { name: 'Chat:', value: chatstatus, inline: true },
                  { name: 'Website:', value: websitestatus, inline: true },
                  { name: 'CDN:', value: websitestatus, inline: true }
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());
                return message.channel.send(statusembed);
              })
            })
          })
        })
      }

    }
    exports.api = api
    })