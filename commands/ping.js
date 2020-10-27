const request = require("request")

const req = require('request')

client.on('message', async message => {
    const ping = () => {
        switch (args[0]) {
            case "api":
                var api = `http://localhost:4242/api`
                req(api, function (err, response, body) {
                  if (err) {
                    message.channel.stopTyping()
                    return message.channel.send('API is down?')
                  }
                  status = JSON.parse(body)
                  message.channel.send(status.message)
                })
                break
            default:
                message.channel.send("Pong!").then(msg => {
                    msg.delete({ timeout: 2750 })
                  })
                break
        }
    }
    exports.ping = ping
    })