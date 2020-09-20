const request = require("request")

const req = require('request')

client.on('message', async message => {
    const api = () => {
        switch (args[0]) {
            case "status":
                var chat = `http://localhost:3000/api`
                var api = `http://localhost:4242/api`
                req(api, function (err, response, body) {
                  if (err) {
                    console.log(err)
                    message.channel.stopTyping()
                    return message.channel.send('Login is offline!')
                  } if (m)
                  console.log(body)
                  status = JSON.parse(body)
                  message.channel.send(status.message)
                })
                req(chat, function (err, response, body) {
                    if (err) {
                      console.log(err)
                      message.channel.stopTyping()
                      return message.channel.send('Chat is offline!')
                    } if (reponse) { return message.channel.send(`Chat is online!`)}
                  })
        }
    }
    exports.api = api
    })