client.on('message', async message => {
    const repeat = () => {
        switch (args[0]) {
            case "start":
                messageRepeat = message.content.slice(commandprefix.length + args[0].length + 8)
                repeater = setInterval(() => {
                    message.channel.send(messageRepeat)
                }, 1500);
                message.channel.send(`Started repeating ${messageRepeat}!`)
                break
            case "stop":
                clearInterval(repeater)
                message.reply(`Stopped repeating!`)
                break
            }
        }
    exports.repeat = repeat
})