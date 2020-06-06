const Discord = require('discord.js');
global.client = new Discord.Client();
const fs = require('fs')
const FastAverageColor = require('fast-average-color');
const request = require('request');
const config = require('./config.json');
const commands = require('./requirements')
var mongo = require('mongodb');
global.commandprefix = "m!"
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var red = 15158332
var green = 6729778 
var statusColor = 0
global.args = "" 
client.login(config.token);

client.on("ready", async ()  => {
  client.user.setActivity("out for you!", { type: "WATCHING"})
  console.log("Ready...");
  console.log(`Logged in as ${client.user.tag}!`);

  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("metrix");
    var coll = dbo.collection("prefixes", function (err, collection) { });
    coll.countDocuments({});
  });
  
  await client.guilds.keyArray().forEach(id => {
    MongoClient.connect(url, function(err, db) {   
    var dbo = db.db("metrix");
    var coll = dbo.collection("prefixes",function(err, collection){}); 
    coll.findOne({
        guild: id
    }, (err, guild) => {
        if (err) console.error(err);

        if (!guild) {
          var initserver = { guild: id, prefix: "m!" };
          dbo.collection("prefixes").insertOne(initserver, function(err, res) {
            });
            db.close();;
        }
      });
    });
  })
})

client.on("guildCreate", async guild => {
  console.log("Joined a new guild: " + guild.name);
  await client.guilds.keyArray().forEach(id => {

  MongoClient.connect(url, function(err, db) {   
  var dbo = db.db("metrix");
  var coll = dbo.collection("prefixes",function(err, collection){}); 
  coll.findOne({
      guild: id
    }, (err, guild) => {
      if (err) console.error(err);

      if (!guild) {
        var initserver = { guild: id, prefix: "m!" };
        dbo.collection("prefixes").insertOne(initserver, function(err, res) {
          });
          db.close();;
      }
      });
    });
  })
})

client.on('message', async message => {
    if (message.guild != null) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("metrix");
        var myquery = { guild: `${message.guild.id}` };
        dbo.collection("prefixes").findOne(myquery, function(err, res) {
          if (err) throw err;
          global.commandprefix = res.prefix
          db.close();
        });
      });
    } else {
      global.commandprefix = "m!"
      }
      setTimeout(async function() {
  if (!message.content.startsWith(commandprefix) || message.author.bot) return;
  args = message.content.slice(commandprefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "prefix") {
    if (message.author.id === '224271118653980692') {
    if (!args.length) {
      return message.channel.send(`Please enter a prefix, ${message.author}!`);
    }
    
    else if (args[0].length > 2) {
      return message.channel.send(`Please provide a valid prefix of length < 2, ${message.author}!`);
      }
      
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("metrix");
        var myquery = { guild: `${message.guild.id}` };
        var newvalues = { $set: { prefix: `${args[0]}` } };
        dbo.collection("prefixes").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log(`1 document for ${message.guild.id} updated`);
          db.close();
        });
      });
      message.channel.send("Success! The prefix has been changed to " + `**${args[0]}**` + ", " + `${message.author}`)
    } else {
      message.channel.send(`You don't have permission to do that, ${message.author}!`)
    }
  }
  //command code is in commands/testcommand.js
  if (command === "testcommand") {
  	testcommand.testcommand();
  }

  //command code is in commands/ping.js
  if (command === "ping") {
    ping.ping();
  }

  //command code is in commands/avatar.js
  if (command === "avatar") {
    avatar.avatar();
  }

  //command code is in commands/info.js
  if (command === "info") {
    info.info();
  }

  //command code is in commands/help.js
  if (command === "help") {
    help.help();
  }		

  //command code is in commands/serverinfo.js
  if (command === "serverinfo") {
    serverinfo.serverinfo();
  }

  //command code is in commands/meme.js
  if (command === "meme") {
    meme.meme();
  }

  //command code is in commands/usage.js
  if (command === "usage") {
    pcusage.pcusage();
  }  

  if (command === "skin") {
    getmcskin.getmcskin();
  }  

  if (command === "poll") {
  if (!args) return message.reply("You must have something to vote for!")
  if (!message.content.includes("?")) 
  return message.reply("Include a ? in your vote!")
  message.channel.send(`:ballot_box:  ${message.author.username} started a vote! React to my next message to vote on it. :ballot_box: `);
  const pollTopic = await message.channel.send(message.content.slice(2));
  await pollTopic.react(`✅`);
  await pollTopic.react(`⛔`);
  // Create a reaction collector
  const filter = (reaction) => reaction.emoji.name === '✅';
  const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
  collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
  collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  }
  }, 250);
})