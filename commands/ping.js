client.on('message', async message => {
    const ping = () => {
        message.channel.send("Pong!").then(msg => {
            msg.delete(2750)
          })
    }
    exports.ping = ping
    })