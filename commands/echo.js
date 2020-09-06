client.on('message', async message => {
    const echo = async() => {
        if (!args[0]) return message.channel.send(`You must have a suggestion, ${message.author}!`)
        message.channel.send(message.content.slice(commandprefix.length + 4))
    }
    exports.echo = echo 
})