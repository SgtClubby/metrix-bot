const request = require("request")
const apikey = require("../config.json").osuapi
client.on('message', async message => {
  const osu = () => {
    switch (args[0]) {
      case "profile":
        if (!args[1]) return message.channel.send("Please enter a Osu! username!")
        var get_user = `https://osu.ppy.sh/api/get_user?u=${args[1]}&k=${apikey}`

        request(get_user, function (err, response, body) {
          if (err) {
            console.log(err)
            return message.reply('Error getting Osu! profile')
          }
          user = JSON.parse(body)
          if (user === undefined) return message.channel.send("Please enter a valid Osu! username!")
          if (user.length == 0) return message.channel.send("Please enter a valid Osu! username!")
          if (user[0].pp_raw === null) return message.channel.send(`User ${user[0].username} has nothing to show`)
          //variables

          const userid = user[0].user_id
          const username = user[0].username
          const rank = user[0].pp_rank
          const pp = user[0].pp_raw
          const accuracy = user[0].accuracy
          const lvl = user[0].level
          const playcount = user[0].playcount
          const country = user[0].country
          const countryrank = user[0].pp_country_rank

          var userimage = `http://s.ppy.sh/a/${userid}`

          //send the embed
          message.channel.send({
            embed: {
              color: 6329542,
              author: {
                name: `Osu! Standard profile for ${username}`,
                icon_url: `https://osu.ppy.sh/images/flags/${country}.png`,
                url: `https://osu.ppy.sh/users/${userid}`,
              },
              description: `▸ **Official Rank:** ${rank} (${country}#${countryrank}) \n▸ **Total PP:** ${parseFloat(pp).toFixed()} \n▸ **Level:** ${parseFloat(lvl).toFixed()} (Playcount: ${playcount}) \n▸ **Hit Accuracy:** ${parseFloat(accuracy).toFixed(2)}%`,
              thumbnail: {
                url: userimage,
              },
              // fields: [{
              //     name: "▸ **Official Rank:**",
              //     value: `${rank} (${country}#${countryrank})`,

              // },
              // {
              //     name: "**Total PP:**",
              //     value: parseFloat(pp).toFixed(),
              //     inline: true
              // },
              // {
              //     name: "**Level:**",
              //     value: `${parseFloat(lvl).toFixed()} (plays: ${playcount})`,
              //     inline: true
              // },
              // {
              //     name: "**Hit Accuracy:**",
              //     value: parseFloat(accuracy).toFixed(2) + "%",
              //     inline: true
              // },
              // ],
              timestamp: new Date(),
              footer: {
                icon_url: message.author.displayAvatarURL,
                text: message.author.tag
              }
            }
          })
        })
        break
      case "topplay":
        if (!args[1]) return message.channel.send("Please enter a Osu! username!")
        if (!args[2]) args[2] = 1
        if (args[2] > 3) return message.channel.send("You cannot view more than top 3 plays")

        const get_score = `https://osu.ppy.sh/api/get_user_best?limit=${args[2]}&u=${args[1]}&k=${apikey}`
        var get_user = `https://osu.ppy.sh/api/get_user?u=${args[1]}&k=${apikey}`

        request(get_score, function (err, response, body) {
          if (err) {
            console.log(err)
            return message.reply('Error getting Osu! profile scores')
          }
          scores = JSON.parse(body)
          request(get_user, function (err, response, body) {
            if (err) {
              console.log(err)
              return message.reply('Error getting Osu! profile')
            }
            user = JSON.parse(body)

            if (user === "undefined") return message.channel.send("Please enter a valid Osu! username!")
            if (user.length == 0) return message.channel.send("Please enter a valid Osu! username!")
            if (user[0].pp_raw === null) return message.channel.send(`User ${user[0].username} has no plays!`)

            //variables
            const userid = user[0].user_id
            const username = user[0].username
            const country = user[0].country

            if (args[2] > 1) message.channel.send(`${username}'s best plays! (might not be in order)`)

            scores.forEach(beatmapscores => {
              const get_beatmap = `https://osu.ppy.sh/api/get_beatmaps?b=${beatmapscores.beatmap_id}&k=${apikey}`

              request(get_beatmap, function (err, response, body) {
                if (err) {
                  console.log(err)
                  return message.reply('Error getting Osu! profile scores')
                }

                best_beatmap = JSON.parse(body)
                first = best_beatmap[0]
                // consts for map
                const map_title = first.title
                const map_artist = first.artist
                const version = first.version
                const stars = first.difficultyrating

                // consts for player
                const top_pp = beatmapscores.pp
                const max_combo = beatmapscores.maxcombo
                const count50 = beatmapscores.count50
                const count100 = beatmapscores.count100
                const count300 = beatmapscores.count300
                const countmiss = beatmapscores.countmiss
                const fcdate = beatmapscores.date
                const mod_dtb = beatmapscores.enabled_mods

                // mod variables
                const Mods = {
                  None: 0,
                  NoFail: 1,
                  Easy: 2,
                  TouchDevice: 4,
                  Hidden: 8,
                  HardRock: 16,
                  SuddenDeath: 32,
                  DoubleTime: 64,
                  HalfTime: 256,
                  Nightcore: 512, // Only set along with DoubleTime. i.e: NC only gives 576
                  Flashlight: 1024,
                  SpunOut: 4096,
                  Perfect: 16384, // Only set along with SuddenDeath. i.e: PF only gives 1641
                }

                isHD = Boolean(mod_dtb & Mods.Hidden)
                isHR = Boolean(mod_dtb & Mods.HardRock)
                isNF = Boolean(mod_dtb & Mods.NoFail)
                isNC = Boolean(mod_dtb & Mods.Nightcore)
                isFL = Boolean(mod_dtb & Mods.Flashlight)
                isSO = Boolean(mod_dtb & Mods.SpunOut)
                isPF = Boolean(mod_dtb & Mods.Perfect)
                isEZ = Boolean(mod_dtb & Mods.Easy)
                isHF = Boolean(mod_dtb & Mods.HalfTime)
                isSD = Boolean(mod_dtb & Mods.SuddenDeath)
                isDT = Boolean(mod_dtb & Mods.DoubleTime)

                beatmapmods = "Mods: "
                if (isHD == true) {
                  beatmapmods += "**HD** "
                }
                if (isHR == true) {
                  beatmapmods += "**HR** "
                }
                if (isNF == true) {
                  beatmapmods += "**NF** "
                }
                if (isNC == true) {
                  beatmapmods += "**NC** "
                  isDT = false
                }
                if (isSO == true) {
                  beatmapmods += "**SO** "
                }
                if (isEZ == true) {
                  beatmapmods += "**EZ** "
                }
                if (isPF == true) {
                  beatmapmods += "**PF** "
                  isSD = false
                }
                if (isHF == true) {
                  beatmapmods += "**HF** "
                }
                if (isSD == true) {
                  beatmapmods += "**SD** "
                }
                if (isDT == true) {
                  beatmapmods += "**DT** "
                }
                if (isFL == true) {
                  beatmapmods += "**FL** "
                }
                if (isHD == false && isHR == false && isNF == false && isNC == false && isSO == false && isEZ == false && isPF == false && isHF == false && isSD == false && isDT == false && isFL == false) {
                  beatmapmods = ""
                }

                map_cover = `https://assets.ppy.sh/beatmaps/${first.beatmapset_id}/covers/cover.jpg`
                userimage = `http://s.ppy.sh/a/${userid}`

                message.channel.send({
                  embed: {
                    color: 6329542,
                    author: {
                      name: `Osu! Standard top play for ${username}`,
                      icon_url: `https://osu.ppy.sh/images/flags/${country}.png`,
                      url: `https://osu.ppy.sh/users/${userid}`,
                    },
                    thumbnail: {
                      url: userimage,
                    },
                    fields: [
                      //      {
                      //     name: "**Date and Time:**",
                      //     value: fcdate,
                      //     inline: false
                      // },
                      {
                        name: "**Beatmap:**",
                        value: `${map_title} by ${map_artist} \n ${parseFloat(stars).toFixed(2)}* [${version}] \n ${beatmapmods}`,
                        inline: false
                      },
                      {
                        name: "**PP:**",
                        value: parseFloat(top_pp).toFixed(1),
                        inline: true
                      },
                      {
                        name: "**Max Combo:**",
                        value: max_combo,
                        inline: true
                      },
                      // {
                      //     name: "**300:**",
                      //     value: count300,
                      //     inline: true
                      // },
                      // {
                      //     name: "**100:**",
                      //     value: count100,
                      //     inline: true
                      // },
                      // {
                      //     name: "**50:**",
                      //     value: count50,
                      //     inline: true
                      // },
                      // {
                      //     name: "**Miss:**",
                      //     value: countmiss,
                      //     inline: true
                      // },
                    ],
                    timestamp: new Date(),
                    image: {
                      url: map_cover,
                    },
                    footer: {
                      icon_url: message.author.displayAvatarURL,
                      text: message.author.tag
                    }
                  }
                })

              })
            })
          })
        })
        break
      default:
        message.channel.send(`Usage: \n${commandprefix}osu profile <osu username> \n${commandprefix}osu topplay <osu username> <amount> `)
        break
    }

  }
  exports.osu = osu
})