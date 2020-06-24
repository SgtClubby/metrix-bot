const request = require("request")
const apikey = require("../config.json").osuapi
client.on('message', async message => {
    const osu = () => {
        if (!args.length) return message.channel.send("Please enter a username!")
        const get_user = `https://osu.ppy.sh/api/get_user?u=${args[0]}&k=${apikey}`
    
        request(get_user, function(err, response, body) {
            if(err) {
                console.log(err)
                return message.reply('Error getting Osu! profile')
            }
            user = JSON.parse(body)
            console.log(user[0])

            if (user === "undefined") return message.channel.send("Please enter a valid Osu! username!")

            var user_image = `http://s.ppy.sh/a/${user[0].user_id}`
            console.log(user_image)

            //variables
            userid = user[0].user_id
            const username = user[0].username
            const rank = user[0].pp_rank
            const pp = user[0].pp_raw
            const accuracy = user[0].accuracy
            const lvl = user[0].level
            const playcount = user[0].playcount
            const country = user[0].country
            const countryrank = user[0].pp_country_rank

            //send the embed
            message.channel.send({embed: {
                color: 6329542,
                author: {
                  name: `Osu! Standard profile for ${username}`,
                  icon_url: `https://osu.ppy.sh/images/flags/${country}.png`,
                  url: `https://osu.ppy.sh/users/${userid}`,
                },
                thumbnail: {
                  url: user_image,
                },
                fields: [{
                    name: "**Official Rank:**",
                    value: `${rank} (${country}#${countryrank})`,
                  },
                  {
                    name: "**Total PP:**",
                    value: parseFloat(pp).toFixed(),
                  },
                  {
                    name: "**Level:**",
                    value: `${parseFloat(lvl).toFixed()} (Playcount: ${playcount})` 
                  },
                  {
                    name: "**Hit Accuracy:**",
                    value: parseFloat(accuracy).toFixed(2) + "%",
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: message.author.displayAvatarURL,
                  text:  message.author.tag
                }
              }   
            }) 
        })
    }
    exports.osu = osu
    })