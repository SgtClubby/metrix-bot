const Discord = require('discord.js')
require('events').EventEmitter.defaultMaxListeners = 50;
global.client = new Discord.Client()
const config = require('./config.json')
const commands = require('./requirements');
global.commandprefix = "m!"
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

global.args = ""
global.totalserver = ""

client.login(config.token)
client.setMaxListeners(100)

client.on("ready", async () => {
    client.user.setActivity("")
    console.log("Ready...")
    console.log(`Logged in as ${client.user.tag}!`)
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("metrix")
        var coll = dbo.collection("prefixes", function(err, collection) {})
        totalserver = coll.countDocuments({})
    })

    await client.guilds.cache.forEach(guild=>{
        let id = guild.id;
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("metrix")
            var coll = dbo.collection("prefixes", function(err, collection) {})
            coll.findOne({
                guild: id
            }, (err, guild) => {
                if (err) console.error(err)

                if (!guild) {
                    var serverid = {
                        guild: id,
                        prefix: "m!"
                    }
                    dbo.collection("prefixes").insertOne(serverid, function(err, res) {})
                    db.close()
                }
            })
        })
    })
})

client.on("guildCreate", async guild => {
    await client.guilds.cache.forEach(guild=>{
        let id = guild.id;
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("metrix")
            var coll = dbo.collection("prefixes", function(err, collection) {})
            coll.findOne({
                guild: id
            }, (err, guild) => {
                if (err) console.error(err)

                if (!guild) {
                    var initserver = {
                        guild: id,
                        prefix: "m!"
                    }
                    dbo.collection("prefixes").insertOne(initserver, function(err, res) {})
                    db.close()
                }
            })
        })
    })
})

client.on('message', async message => {
	function n(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
    rngxp = Math.floor(Math.random() * (6 - 2 + 1) + 2)
    if (message.guild != null) {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, db) {
            if (err) throw err
            var dbo = db.db("metrix")
            var myquery = {
                guild: `${message.guild.id}`
            }
            dbo.collection("prefixes").findOne(myquery, function(err, res) {
                if (err) throw err
                global.commandprefix = res.prefix
                db.close()
            })
        })
    } else {
        global.commandprefix = "m!"
    }

    setTimeout(async function() {
        if (!message.content.startsWith(commandprefix) || message.author.bot) return
        args = message.content.slice(commandprefix.length).split(/ +/)
        const command = args.shift().toLowerCase()

        if (command === "prefix") {
            if (message.channel.type === 'dm') return message.channel.send("Sorry! Prefix cannot be changed in DMs.")
            if (!message.member.hasPermission('MANAGE_GUILD') || message.author.id != "224271118653980692") return message.reply(`You don't have permission to do that!`)
            if (!args.length) {
                return message.channel.send(`Please enter a prefix, ${message.author}!`)
            } else if (args[0].length > 2) {
                return message.channel.send(`Please provide a valid prefix of length ≤ 2, ${message.author}!`)
            }

            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function(err, db) {
                if (err) throw err
                var dbo = db.db("metrix")
                var myquery = {
                    guild: `${message.guild.id}`
                }
                var newvalues = {
                    $set: {
                        prefix: `${args[0]}`
                    }
                }
                dbo.collection("prefixes").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err
                    db.close()
                })
            })
            message.channel.send(`Success! The prefix has been changed to **${args[0]}**, ${message.author}`)
        }

        switch (command) {
            case "ping": // command code is in commands/ping.js
                ping.ping();
                break
            case "avatar": // command code is in commands/avatar.js
                avatar.avatar();
                break
            case "info": // command code is in commands/info.js
                info.info();
                break
            case "help": // command code is in commands/help.js
                help.help();
                break
            case "serverinfo": // command code is in commands/serverinfo.js
                serverinfo.serverinfo();
                break
            case "meme": // command code is in commands/meme.js
                meme.meme();
                break
            case "usage": // command code is in commands/usage.js
                pcusage.pcusage();
                break
            case "skin":
                getmcskin.getmcskin(); // command code is in commands/getskin.js
                break
            case "todo":
                if (message.author.id != config.owner) return
                todo.todo(); // command code is in commands/todo.js
                message.delete()
                break
            case "level":
                if (message.author.id != config.owner) return message.reply(`you do not have permission to perform this command!`)
                levels.levels(); // command code is in commands/levels.js
                break
            case "suggestion":
                suggestion.suggestion(); // command code is in commands/suggestion.js
                message.delete()
                break
            case "prefix":
                break
            case "echo":
                if (message.author.id != config.owner) return message.reply(`you do not have permission to perform this command!`)
                echo.echo(); // command code is in commands/echo.js
                message.delete()
                break

            case "role":
                if (message.author.id != config.owner) return message.reply(`you do not have permission to perform this command!`)
                editrole.editrole() // command code is in commands/editrole.js'
                message.delete(500)
                break
            case "osu":
                getosuuser.osu()
                break
            case "speedtest":
                if (message.author.id != config.owner) return message.reply(`you do not have permission to perform this command!`)
                speedtest_test.speedtest_test(); // command code is in commands/speedtest.js
                break
            case "voice":
                if (message.author.id != config.owner) return message.reply(`you do not have permission to perform this command!`)
                join.joinchannel(); // command code is in commands/channeljoin.js
                message.delete()
                break
            case "poll":
                if (!args) return message.reply("You must have something to vote for!")
                if (!message.content.includes("?"))
                    return message.reply("Include a ? in your vote!")
                message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `)
                const pollTopic = await message.channel.send(message.content.slice(commandprefix.length + 4))
                await pollTopic.react(`✅`)
                await pollTopic.react(`⛔`)
                break
    
            case "leaderboard":
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err
                    var dbo = db.db("metrix")
                    dbo.collection("levels").find({}).sort({
                        exp: -1
                    }).limit(10).toArray(function(err, output) {
                        if (err) throw err
                        db.close()
                        var rankpos = 0
                        var quotes = "```"
                        var tab = " "
                        var lines = "-"
                        var user_on_leaderboard = `${lines.repeat(52)}\n`
                        output.forEach(user_rank => {
                            var user = client.users.get(user_rank.user_id);
                            rankpos = rankpos + 1
                            name = user.username
                            xp = user_rank.exp
                            lvl = user_rank.level
                            user_on_leaderboard += `${rankpos}. ${name} ${tab.repeat(60)} Level ${lvl} ${tab.repeat(2 - (lvl.length)) + "|" + tab.repeat(1 - (lvl.length / 2))} ${n(xp)} XP\n${lines.repeat(52)}\n`
                        })
                        message.channel.send({
                            embed: {
                                color: 6329542,
                                title: `Rank Leaderboard`,
                                description: `${quotes}apache\n${user_on_leaderboard}${quotes}`,
                            }
                        })
                    })
                })
                break





            case "rank":
                if (message.channel.type === 'dm') {
                    var member = message.author.id
                    var picture = message.author.displayAvatarURL
                    var name = message.author.username
                } else if (!message.mentions.members.first()) {
                    var picture = message.author.displayAvatarURL
                    var name = message.author.username
                    member = message.author.id
                } else {
                    member = message.mentions.members.first().id
                    name = message.mentions.members.first().user.username
                    const avatarList = message.mentions.users.map(user => {
                        return `${user.displayAvatarURL}`
                    })
                    avatarList.forEach(avatarCommand => {
                        picture = avatarCommand
                    })
                }

                setTimeout(function async () {
                    MongoClient.connect(url, async function(err, db) {
                        if (err) throw err
                        var dbo = db.db("metrix")
                        var myquery = {
                            user_id: member
                        }
                        dbo.collection("levels").findOne(myquery, async function(err, res) {
                            if (err) throw err
                            if (!res) return message.channel.send(`${name} has no level data! Please try again later!`)
                            var curlvl = res.level
                            var curexp = res.exp
                            var user = name

                            const nxtLvlexp = 150 * (Math.pow(1.5, curlvl) - 1)
                            const prevLvlexp = 150 * (Math.pow(1.5, curlvl - 1) - 1)
                            var rankupxp = nxtLvlexp.toFixed(0) - prevLvlexp.toFixed(0)
                            var difference = rngxp + curexp - prevLvlexp.toFixed(0)
                            var count = (difference / rankupxp.toFixed(0) * 100).toFixed(0)
                            if (difference > rankupxp) count = 100
                            const bar_len = 28
                            const filled_len = (count * bar_len / 100).toFixed(0)
                            const bar = '║' + '█'.repeat(filled_len) + '░'.repeat((bar_len - filled_len).toFixed(0)) + '║'
                            remaining_xp = rankupxp - difference
                            message.channel.send({
                                embed: {
                                    color: 6329542,
                                    title: `${user}'s rank`,
                                    thumbnail: {
                                        url: picture,
                                    },
                                    fields: [{
                                            name: "**Current Level:**",
                                            value: `${curlvl} (Total XP: ${n(curexp)})`,
                                        },
                                        {
                                            name: "**XP:**",
                                            value: `${n(difference)} / ${n(rankupxp)} (Remaining: ${n(remaining_xp)} XP)\n ${bar} ${count}%`,
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: message.author.displayAvatarURL,
                                        text: message.author.tag
                                    }
                                }
                            })
                            db.close()
                        })
                    })
                }, 250)
                break

                
            default:
                message.channel.send(`Unknown command. Use ${commandprefix}help for command list.`) // For all unrecognized commands
        }
    }, 250)

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("metrix")
        var coll = dbo.collection("levels", function(err, collection) {})
        coll.findOne({
            user_id: message.author.id
        }, (err, user_id) => {
            if (err) console.error(err)
            if (!user_id) {
                var newtrackeduser = {
                    name: message.author.username,
                    user_id: message.author.id,
                    level: 1,
                    exp: rngxp
                }
                if (message.author.bot) return
                dbo.collection("levels").insertOne(newtrackeduser, function(err, res) {})
                db.close()
            }
        })
    })

    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("metrix")
        var myquery = {
            user_id: `${message.author.id}`
        }
        dbo.collection("levels").findOne(myquery, function(err, res) {
            if (err) throw err
            if (!res) return
            if (res.user_id === client.user.id) return
            if (message.author.id === 485804292947574784) return console.log("You're gay!")
            var curlvl = res.level
            var curexp = res.exp
            var user = res.name
            var userid = res.user_id
            db.close()

            const new_xp = curexp + rngxp
            const nxtLvlexp = 150 * (Math.pow(1.5, curlvl) - 1);

            setTimeout(async function() {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err
                    var dbo = db.db("metrix")
                    var myquery = {
                        user_id: message.author.id
                    }
                    var newvalues = {
                        $set: {
                            exp: new_xp
                        }
                    }
                    dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err
                        db.close()
                    })
                })
                setTimeout(async function() {
                    if (new_xp >= nxtLvlexp.toFixed(0)) {
                        newlvl = curlvl + 1
                        MongoClient.connect(url, function(err, db) {
                            if (err) throw err
                            var dbo = db.db("metrix")
                            var myquery = {
                                user_id: message.author.id
                            }
                            var newvalues = {
                                $set: {
                                    level: newlvl
                                }
                            }
                            dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err
                                db.close()
                                message.channel.send({
                                    embed: {
                                        color: 6329542,
                                        title: `You ranked up!`,
                                        thumbnail: {
                                            url: message.author.displayAvatarURL,
                                        },
                                        fields: [{
                                            name: "**Level:**",
                                            value: `${curlvl} -> ${curlvl + 1}`,
                                        }],
                                    }
                                })
                            })
                        })
                    }

                    // console.log(
                    //   `\n`,
                    //   `Username: ${user}\n`,
                    //   `User ID: ${userid}\n`,
                    //   `Generated XP: ${rngxp}\n`,
                    //   `Current XP from database: ${curexp}\n`,
                    //   `Updated XP sent to database: ${new_xp}\n`,
                    //   `Current Level in database: ${curlvl}\n`,
                    //   `Next level EXP requirement: ${nxtLvlexp.toFixed(0)}\n`
                    // )
                }, 150)
            }, 100)


        })
    })
})