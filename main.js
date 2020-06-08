
const Discord = require('discord.js')
global.client = new Discord.Client()
const fs = require('fs')
const FastAverageColor = require('fast-average-color')
const request = require('request')
const config = require('./config.json')
const commands = require('./requirements')
var mongo = require('mongodb')
global.commandprefix = "m!"
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
var red = 15158332
var green = 6729778
var statusColor = 0
global.args = "" 
global.totalserver = ""
client.login(config.token)
client.setMaxListeners(100)

client.on("ready", async ()  => {
  client.user.setActivity("")
  console.log("Ready...")
  console.log(`Logged in as ${client.user.tag}!`)

  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("metrix")
    var coll = dbo.collection("prefixes", function (err, collection) { })
    totalserver = coll.countDocuments({})
  })

  await client.guilds.keyArray().forEach(id => {
    MongoClient.connect(url, function(err, db) {  
    name = guild.name
    console.log(name)  
    var dbo = db.db("metrix")
    var coll = dbo.collection("prefixes",function(err, collection){})
    coll.findOne({
        guild: id
    }, (err, guild) => {
        if (err) console.error(err)

        if (!guild) {
        var initserver = { guild: id, prefix: "m!", name: name } 
          dbo.collection("prefixes").insertOne(initserver, function(err, res) {
            })
            db.close()
        }
      })
    })
  })
})

client.on("guildCreate", async guild => {
  console.log("Joined a new guild: " + guild.name)
  await client.guilds.keyArray().forEach(id => {
  name = guild.name
  console.log(name)
  MongoClient.connect(url, function(err, db) {   
  var dbo = db.db("metrix")
  var coll = dbo.collection("prefixes",function(err, collection){})
  coll.findOne({
      guild: id
    }, (err, guild) => {
      if (err) console.error(err)

      if (!guild) {
        var initserver = { guild: id, prefix: "m!", name: name } 
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
      MongoClient.connect(url, function(err, db) {
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
      return message.channel.send(`Please provide a valid prefix of length < 2, ${message.author}!`)
      }
      
      MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("metrix")
        var myquery = { guild: `${message.guild.id}` }
        var newvalues = { $set: { prefix: `${args[0]}` } }
        dbo.collection("prefixes").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err
          db.close()
        })
      })
      message.channel.send("Success! The prefix has been changed to " + `**${args[0]}**` + ", " + `${message.author}`)
    
  }

  switch (command) {
    case "testcommand": // command code is in commands/testcommand.js
      testcommand.testcommand();
      message.delete()
      break
    case "ping": // command code is in commands/ping.js
      ping.ping();
      message.delete()
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
      message.delete(3000)
      break
    case "skin":
      getmcskin.getmcskin();
      message.delete()
      break
    case "todo":
      if (!message.guild.id === '715480344949817416') return message.reply("can't do that")
      todo.todo();
      message.delete()
      break
  }

  if (command === "poll") {
  if (!args) return message.reply("You must have something to vote for!")
  if (!message.content.includes("?")) 
  return message.reply("Include a ? in your vote!")
  message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `)
  const pollTopic = await message.channel.send(message.content.slice(commandprefix + 4))
  await pollTopic.react(`✅`)
  await pollTopic.react(`⛔`)
  }
  
  }, 250)
})
