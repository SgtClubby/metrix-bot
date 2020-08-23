const MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
client.on('message', async message => {
    const levels = () => {
        switch (args[0]) {
            case "give":
                switch (args[1]) {
                    case "xp":
                        //grant user specified EXP points
                        member = message.mentions.members.first().id
                        name = message.mentions.members.first().user.username
                        if (!member) return message.channel.send("Please specify a user!")

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
                                var updated_XP = parseInt(current_xp) + parseInt(args[3])
                                var updated_level = parseInt(current_level)
                                nxtLvlexp = 150 * (Math.pow(1.5, updated_level) - 1)
                                for (var nxtLvlexp; updated_XP > nxtLvlexp.toFixed(0); updated_level++) {
                                    nxtLvlexp = 150 * (Math.pow(1.5, updated_level) - 1)
                                    if (updated_XP < nxtLvlexp.toFixed(0)) {
                                        break
                                    }
                                }

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

                                        message.channel.send(`Granted ${args[3]} XP to ${name}`)
                                    })
                                })
                            })
                        })
                }
                break
            case "remove":
                switch (args[1]) {
                    case "xp":
                        //remove user specified EXP points
                        member = message.mentions.members.first().id
                        name = message.mentions.members.first().user.username
                        if (!member) return message.channel.send("Please specify a user!")

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

                                for (var nxtLvlexp; updated_XP < nxtLvlexp.toFixed(0); updated_level--) {
                                    nxtLvlexp = 150 * (Math.pow(1.5, updated_level - 1) - 1)
                                    if (updated_XP > nxtLvlexp.toFixed(0)) {
                                        break
                                    }
                                }

                                if (updated_level < 1) updated_level = 1
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

                                        message.channel.send(`Revoked ${args[3]} XP from ${name}`)
                                    })
                                })
                            })
                        })
                }
                break
        }
    }

    exports.levels = levels
})