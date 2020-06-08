randomPuppy = require("random-puppy")

client.on('message', async message => {
    const meme = () => {
        var reddit = [
            "meme",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "AnimeFunny",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "AdviceAnimals"
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
        }).catch(err => console.error(err))
      }
    exports.meme = meme
})