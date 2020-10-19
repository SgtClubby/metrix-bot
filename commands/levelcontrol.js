const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
client.on('message', async message => {
    const levels = () => {
        function n(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        switch (args[0]) {
            case "exp":
                var l = 0
                var s = ""
                if (!args[1]) return message.channel.send("Specify Level!")
                for (let i = 0; i < args[1]; i++) {
                    l = l + 1
                    e = 150 * (Math.pow(1.5, l - 1) - 1)
                    s = `For level ${l} you need ${n(e.toFixed(0))} XP\n`
                }
                message.channel.send(s)
                break
            case "xp":
                switch (args[1]) {
                    case "give":
                        if (!message.mentions.members.first()) return message.channel.send("Please specify a user!")
                        if (!args[3]) return message.channel.send("Please specify an amount!")
                        var member = message.mentions.members.first().id
                        var name = message.mentions.members.first().user.username
                        MongoClient.connect(url, function(err, db) {
                            if (err) throw err
                            var dbo = db.db("metrix")
                            var myquery = {
                                user_id: member
                            }
                            dbo.collection("levels").findOne(myquery, async function(err, res) {
                                if (err) throw err
                                db.close()
                                if (!res) return message.channel.send(`${name} has no level data! Please try again later!`)
                                var current_xp = res.exp
                                var current_level = res.level

                                //set new xp amount
                                var updated_XP = parseInt(current_xp) + parseInt(args[3])
                                var updated_level = parseInt(current_level)
                                var nxtLvlexp = 150 * (Math.pow(1.5, updated_level) - 1)

                                //calculate new level based on given xp
                                for (var nxtLvlexp; updated_XP > nxtLvlexp.toFixed(0); updated_level++) {
                                    nxtLvlexp = 150 * (Math.pow(1.5, updated_level) - 1)
                                    if (updated_XP < nxtLvlexp.toFixed(0)) {
                                        break
                                    }
                                }

                                //upload new level and xp info into database
                                MongoClient.connect(url, function(err, db) {
                                    if (err) throw err
                                    var dbo = db.db("metrix")
                                    var myquery = {
                                        user_id: member
                                    }
                                    var newvalues = {
                                        $set: {
                                            exp: updated_XP,
                                            level: updated_level
                                        }
                                    }
                                    dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
                                        if (err) throw err
                                        db.close()

                                        message.channel.send(`Granted ${n(args[3])} XP to ${name}`)
                                    })
                                })
                            })
                        })
                        break

                    case "remove":
                        if (!message.mentions.members.first()) return message.channel.send("Please specify a user!")
                        if (!args[3]) return message.channel.send("Please specify an amount!")
                        var member = message.mentions.members.first().id
                        var name = message.mentions.members.first().user.username
                        //get current xp amount
                        MongoClient.connect(url, function(err, db) {
                            var dbo = db.db("metrix")
                            var myquery = {
                                user_id: member
                            }
                            dbo.collection("levels").findOne(myquery, async function(err, res) {
                                if (err) throw err
                                db.close()
                                if (!res) return message.channel.send(`${name} has no level data! Please try again later!`)
                                current_xp = res.exp
                                current_level = res.level

                                //set new xp ammount
                                var updated_XP = parseInt(current_xp) - parseInt(args[3])
                                if (updated_XP < 0) updated_XP = 0

                                var updated_level = parseInt(current_level)
                                nxtLvlexp = 150 * (Math.pow(1.5, updated_level - 1) - 1)

                                //update level based on given xp
                                for (var nxtLvlexp; updated_XP < nxtLvlexp.toFixed(0); updated_level--) {
                                    nxtLvlexp = 150 * (Math.pow(1.5, updated_level - 1) - 1)
                                    if (updated_XP > nxtLvlexp.toFixed(0)) {
                                        break
                                    }
                                }

                                if (updated_level < 1) updated_level = 1

                                //upload new level and xp info into database
                                MongoClient.connect(url, function(err, db) {
                                    if (err) throw err
                                    var dbo = db.db("metrix")
                                    var myquery = {
                                        user_id: member
                                    }
                                    var newvalues = {
                                        $set: {
                                            exp: updated_XP,
                                            level: updated_level
                                        }
                                    }
                                    dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
                                        if (err) throw err
                                        db.close()

                                        message.channel.send(`Revoked ${n(args[3])} XP from ${name}`)
                                    })
                                })
                            })
                        })
                        break
                        default: message.channel.send(`**Usage**: ${commandprefix}level xp <remove give> <user> <amount>`)
                }
            }
        }
    exports.levels = levels
})