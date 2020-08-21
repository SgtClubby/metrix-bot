const Discord = require('discord.js')
require('events').EventEmitter.defaultMaxListeners = 50;
global.client = new Discord.Client()
const fs = require('fs')
const request = require('request')
const config = require('./config.json')
const commands = require('./requirements');
const cliProgress = require('cli-progress');
const { stdin, stdout } = require('process');
global.commandprefix = "m!"
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"


global.args = "" 
global.totalserver = ""

client.login(config.token)
client.setMaxListeners(100)

client.on("ready", async () => {
  client.user.setActivity("")
  console.log("Ready...")
  console.log(`Logged in as ${client.user.tag}!`)
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    var dbo = db.db("metrix")
    var coll = dbo.collection("prefixes", function (err, collection) { })
    totalserver = coll.countDocuments({})
  }) 
  await client.guilds.keyArray().forEach(id => {
    MongoClient.connect(url, function(err, db) {   
    var dbo = db.db("metrix")
    var coll = dbo.collection("prefixes",function(err, collection){})
    coll.findOne({
        guild: id
      }, (err, guild) => {
        if (err) console.error(err)
  
        if (!guild) {
          var serverid = { guild: id, prefix: "m!" } 
          dbo.collection("prefixes").insertOne(serverid, function(err, res) {
            })
            db.close()
        }
        })
      })
    })
  })

client.on("guildCreate", async guild => {
  await client.guilds.keyArray().forEach(id => {
  MongoClient.connect(url, function(err, db) {   
  var dbo = db.db("metrix")
  var coll = dbo.collection("prefixes",function(err, collection){})
  coll.findOne({
      guild: id
    }, (err, guild) => {
      if (err) console.error(err)

      if (!guild) {
        var initserver = { guild: id, prefix: "m!" } 
        dbo.collection("prefixes").insertOne(initserver, function(err, res) {
          })
          db.close()
      }
      })
    })
  })
})

client.on('message', async message => {
    if (message.guild != null) {
      MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err
          var dbo = db.db("metrix")
          var myquery = { guild: `${message.guild.id}` }
          dbo.collection("prefixes").findOne(myquery, function(err, res) {
        if (err) throw err
          global.commandprefix = res.prefix
          db.close()
        })
      })
    } else {
      global.commandprefix = "m!"
    }
      
    
      setTimeout(async function () {
        
  if (!message.content.startsWith(commandprefix) || message.author.bot) return
  args = message.content.slice(commandprefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === "prefix") {
    if (message.channel.type === 'dm') return message.channel.send("Sorry! Prefix cannot be changed in DMs.")
    if (!message.member.hasPermission('MANAGE_GUILD') || message.author.id != "224271118653980692" ) return message.reply(`You don't have permission to do that!`)
    if (!args.length) {
      return message.channel.send(`Please enter a prefix, ${message.author}!`)
    }
    
    else if (args[0].length > 2) {
      return message.channel.send(`Please provide a valid prefix of length ≤ 2, ${message.author}!`)
      }
      
      MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err
        var dbo = db.db("metrix")
        var myquery = { guild: `${message.guild.id}` }
        var newvalues = { $set: { prefix: `${args[0]}` } }
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
    case "levels":
      levels.levels(); // command code is in commands/levels.js
      break
    case "suggestion":
      suggestion.suggestion(); // command code is in commands/suggestion.js
      message.delete()
      break
    case "prefix":
      break
    case "echo":
      if (message.author.id != config.owner) return message.reply(`No perms`)
      echo.echo(); // command code is in commands/echo.js
      message.delete()
      break

    case "role":
      if (message.author.id != config.owner) return message.reply(`Nah fam`)
      editrole.editrole() // command code is in commands/editrole.js'
      message.delete(500)
      break
      
    case "osu":
      getosuuser.osu()
      break
    case "speedtest":
      if (message.author.id != config.owner) return message.reply(`Nah, you cant do this`)
      speedtest_test.speedtest_test(); // command code is in commands/speedtest.js
      break
    case "voice":
      if (message.author.id != config.owner) return message.reply(`Admin man only!`)
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
            dbo.collection("levels").find({}).toArray(function(err, result) {
          if (err) throw err
            db.close()
        console.log(result)
        })
        })
      case "rank": 
      const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      setTimeout( function async () {
      MongoClient.connect(url, async function(err, db) {
        if (err) throw err
          var dbo = db.db("metrix")
          var myquery = { user_id: `${message.author.id}` }
          dbo.collection("levels").findOne(myquery, async function(err, res) {
        if (err) throw err
          if (!res) return
          var curlvl = res.level
          var curexp = res.exp
          var user = res.name

          const nxtLvlexp = 150 * (Math.pow(1.5, curlvl) - 1)  

          const Stream = require('stream');
          const stream = new Stream.Readable()  
       
          const b1 = new cliProgress.SingleBar({
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            format: '[{bar}]',
            stream: stream,
          });

          b1.start(nxtLvlexp, curexp)

          message.channel.send(`Username: ${user}\nXP:` + `\nCurrent Level: ${curlvl}\n`)
          db.close()
          })
        })
      }, 500)
        break
    default:
      message.channel.send(`Unknown command. Use ${commandprefix}help for command list.`) // For all unrecognized commands
  }

  }, 250)

  initialxpAdd = Math.floor(Math.random() * (18 - 2 + 1) + 2);

  MongoClient.connect(url, function(err, db) {   
    var dbo = db.db("metrix")
    var coll = dbo.collection("levels",function(err, collection){})
    coll.findOne({
      user_id: message.author.id
      }, (err, user_id) => {
        if (err) console.error(err)
        if (!user_id) {
          var newtrackeduser = { name: message.author.username, user_id: message.author.id, level: 1, exp: initialxpAdd } 
          dbo.collection("levels").insertOne(newtrackeduser, function(err, res) {
            })
            db.close()
            console.log("Added new user!")
            
        }
        })
    })
    MongoClient.connect(url, function(err, db) {
      if (err) throw err
        var dbo = db.db("metrix")
        var myquery = { user_id: `${message.author.id}` }
        dbo.collection("levels").findOne(myquery, function(err, res) {
      if (err) throw err
        if (!res) return
        if (res.user_id === client.user.id) return
        curlvl = res.level
        curexp = res.exp
        user = res.name
        userid = res.user_id
        db.close()

        const xpAdd = Math.floor(Math.random() * (18 - 2 + 1) + 2);
        
        const new_xp = curexp + xpAdd

        const nxtLvlexp = 100 * (Math.pow(1.5, curlvl) - 1);     

        setTimeout( async function () {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err
          var dbo = db.db("metrix")
          var myquery = { user_id: message.author.id }
          var newvalues = { $set: { exp: new_xp } }
          dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err
            db.close()
          })
        })
         setTimeout( async function () {
        if (new_xp >= nxtLvlexp.toFixed(0)) {
          console.log("level up?")
          newlvl = curlvl + 1
          MongoClient.connect(url, function(err, db) {
            if (err) throw err
            var dbo = db.db("metrix")
            var myquery = { user_id: message.author.id }
            var newvalues = { $set: { level: newlvl } }
            dbo.collection("levels").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err
              db.close()
            })
          })
        }

        console.log(
          `\n`,
          `Username: ${user}\n`,
          `User ID: ${userid}\n`,
          `Generated XP: ${xpAdd}\n`,
          `Current XP from database: ${curexp}\n`,
          `Updated XP sent to database: ${new_xp}\n`,
          `Current Level in database: ${curlvl}\n`,
          `Next level EXP requirement: ${nxtLvlexp.toFixed(0)}\n`
        )
        },150)
      },100)


    })
  })
})
