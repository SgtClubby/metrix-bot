client.on('message', async message => {
    const rname = async () => {
        if (!args[0]) return message.reply(`provide nick!`)
        let members = message.guild.members.cache
        // console.log(users)
        members.forEach(member => {
            setTimeout(async () => {
                try {
                    const user = message.guild.members.cache.get(member.user.id)
                    if (member.roles.cache.has('733441573328781323')) return console.log("Admin Role")
                    if (user.id === '224271118653980692') return console.log("Server Owner")
                    if (user.id === '516988838535626752') return console.log("Server Owner")
                    await message.guild.members.cache.get(member.user.id).setNickname(args[0])  
                    
                } catch (error) {
                    console.log(`\nCan't rename ${member.user.username}!\nReason:\n${error}`)
                    
                }
            }, 200);

        });
    }
exports.rname = rname
})