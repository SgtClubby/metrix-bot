randomPuppy = require("random-puppy")

client.on('message', async message => {
    const meme = () => {
        var reddit = [
            "dankmemes",
            "MemeEconomy",
            "deepfriedmemes",
            "okbuddyretard"
        ]
        
        var subreddit = reddit[Math.floor(Math.random() * reddit.length)]
        
        message.channel.startTyping()
        
        randomPuppy(subreddit).then(async url => {
                await message.channel.send({
                    files: [{
                        attachment: url,
                        name: 'meme.png'
                    }]
                }).then(() => message.channel.stopTyping())
        }).catch(err => {message.channel.send(err) 
                         message.channel.stopTyping()
                        })
      }
      exports.meme = meme
})