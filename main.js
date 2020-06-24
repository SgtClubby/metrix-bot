const Discord = require('discord.js')
require('events').EventEmitter.defaultMaxListeners = 50;
global.client = new Discord.Client()
const fs = require('fs')
const request = require('request')
const config = require('./config.json')
const commands = require('./requirements');
const { osu } = require('./commands/osu');
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
      setTimeout(async function() {
        
  if (!message.content.startsWith(commandprefix) || message.author.bot) return
  args = message.content.slice(commandprefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === "prefix") {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`You don't have permission to do that!`)
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
      message.delete(3000)
      break
    case "avatar": // command code is in commands/avatar.js
      avatar.avatar();
      break
    case "info": // command code is in commands/info.js
      info.info();
      message.delete()
      break
    case "help": // command code is in commands/help.js
      help.help();
      message.delete()
      break
    case "serverinfo": // command code is in commands/serverinfo.js
      serverinfo.serverinfo();
      message.delete()
      break
    case "meme": // command code is in commands/meme.js
      meme.meme();
      break
    case "usage": // command code is in commands/usage.js
      pcusage.pcusage();
      break
    case "skin":
      getmcskin.getmcskin(); // command code is in commands/getskin.js
      message.delete()
      break
    case "todo":
      if (message.author.id != "224271118653980692") return 
      todo.todo(); // command code is in commands/todo.js
      message.delete()
      break
    case "suggestion":
      suggestion.suggestion(); // command code is in commands/suggestion.js
      message.delete()
      break
    case "prefix":
      break
    case "echo":
      echo.echo(); // command code is in commands/echo.js
      message.delete()
      break
    case "osu":
      getosuuser.osu()
      break
    case "speedtest":
      if (message.author.id != "224271118653980692") return message.reply(`nah fam`)
      speedtest_test.speedtest_test(); // command code is in commands/speedtest.js
      break
    case "poll":
      if (!args) return message.reply("You must have something to vote for!")
      if (!message.content.includes("?")) 
      return message.reply("Include a ? in your vote!")
      message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `)
      const pollTopic = await message.channel.send(message.content.slice(commandprefix + 4))
      await pollTopic.react(`✅`)
      await pollTopic.react(`⛔`)
      break
    default:
      message.channel.send(`Unknown command. Use ${commandprefix}help for command list.`) // For all unrecognized commands
  }
  }, 250)
})
