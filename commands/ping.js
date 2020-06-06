client.on('message', async message => {
    const ping = () => {
        message.channel.send("Pong!")
    }
    exports.ping = ping
    })