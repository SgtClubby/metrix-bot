const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');
const fs = require('fs')
const si = require('systeminformation');
const request = require('request');
const config = require('./config.json');
const { prefix } = require('./prefix.json');
client.login(config.token);

client.on("ready", () => {
  console.log("Ready...");
  client.user.setActivity(`Monitoring Systems... Type ${prefix}help!`);
})

async function currentloadData() {
  try {
    const data = await si.currentLoad();
    return data.currentload;
  } catch (e) {
    throw e
  }
}

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

	var usageColor = 0
	var red = 15158332                                            // Assigns color red
	var orange = 15105570                                         // Assigns color orange
	var yellow = 15844367                                         // Assigns color yellow 
	var green = 6729778                                           // Assigns color green

  const usage = await currentloadData().catch(console.log)

//==================================================================================================
//||   Command Ping
//==================================================================================================

    if (command === "ping") {
      console.log(message.author.username + " called command " + command + "!")
      message.channel.send("Pong!")
    }

//==================================================================================================
//||   Command Avatar
//==================================================================================================

    if (command === "avatar") {
      console.log(message.author.username + " called command " + command + "!")
      if (!message.mentions.users.size) {
        return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true, preview: true })}>`);
      }
    
      const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
      });
    
      message.channel.send(avatarList);
    }

//==================================================================================================
//||   Command Change Prefix
//==================================================================================================


    const changePrefix = {
      prefix: `${args[0]}`,
    }
    const jsonString = JSON.stringify(changePrefix)

    if (command === "prefix") {
      console.log(message.author.username + " called command " + command + "!")
      if (!args.length) {
        return message.channel.send(`Please enter a prefix, ${message.author}!`);
      }
    else if (args[0].length > 1) {
      return message.channel.send(`Please provide prefix of length 1, ${message.author}!`);
      }
    
    fs.writeFile('./prefix.json', jsonString, err => {
      if (err) {
          console.log('Error writing to file', err)
      } else {
          console.log('Successfully updated prefix')
      }
    })

    message.channel.send("Success! The prefix has been updated to `" + args[0] + "` " + `${message.author}`)
    }

//==================================================================================================
//||   Command Usage
//==================================================================================================

// Changes color of Embed based on CPU Load

if (usage >= 100) {
  usageColor = red;
} else if (usage >= 50) {
  usageColor = orange;
  } else if (usage >= 25){
  usageColor = yellow;
    } else {
    usageColor = green;
}    

  var mem = process.memoryUsage().heapUsed / 1024 / 1024        // Gets current memory usage
//var totalmem = os.totalmem / 1024 / 1024 / 1024               // Gets total system memory
	var totalmem = process.memoryUsage().heapTotal / 1024 / 1024

	if (command === "usage") {
    console.log(message.author.username + " called command usage!")
    console.log("CPU usage was " + usage.toFixed(2) + "%")
    console.log("RAM usage was " + mem.toFixed(2) + " GB / " + totalmem.toFixed(2) + " GB")
    message.channel.send({embed: {
        color: usageColor,
        author: {
          name: "",
          icon_url: ""
        },
        title: "Server resources",
        url: "https://guttespinat.no",
        fields: [{
            name: "**CPU Usage:**",
            value: usage.toFixed(2) + "%"
          },
          {
            name: "**RAM Usage:**",
            value: mem.toFixed(2) + " GB / " + totalmem.toFixed(2) + " GB"
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL(),
          text:  message.author.username
        }
       }
    })
  }	    	

//==================================================================================================
//||   Command Help
//==================================================================================================

  if (command === "help") {
    message.channel.send({embed: {
        color: "#72bcd4",
        author: {
          name: "",
          icon_url: ""
        },
        title: "Commands",
        url: "https://guttespinat.no",
        fields: [{
            name: "**Available commands:**",
            value: prefix + "serverinfo \n" + prefix + "usage \n" + prefix + "help \n" + prefix + "avatar \n" + prefix + "prefix \n",
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL(),
          text:  message.author.username
        }
      }   
    })
  }		

//==================================================================================================
//||   Command Serverinfo
//==================================================================================================



  if (command === "serverinfo") {
  console.log(message.author.username + " called command serverinfo!")
  var statusColor = 0
  const user = message.mentions.users.first() || message.author;

      var url = 'http://mcapi.us/server/status?ip=' + config.mcIP + '&port=' + config.mcPort;
      request(url, function(err, response, body) {
          if(err) {
              console.log(err);
              return message.reply('Error getting Minecraft server status...');
          }
          body = JSON.parse(body);
          var status = '*Minecraft server is currently offline*';
    statusColor = red;
          if(body.online) {
              status = 'Minecraft server is **online**  -  ';
      statusColor = green;
              if(body.players.now) {
                  status += '**' + body.players.now + '** people are playing!';
              } else {
                  status += 'Nobody is playing!';
        console.log("Nobody is playing")
              }
          }
          message.channel.send({embed: {
              color: statusColor,
              author: {
                name: "",
                icon_url: ""
              },
              title: "Minecraft Server Status",
              url: "https://guttespinat.no",
              fields: [{
                  name: "**Server:**",
                  value: config.mcIP + ":" + config.mcPort
                },
                {
                  name: "**Status:**",
                  value: status
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: message.author.displayAvatarURL(),
                text:  message.author.username
            }
          }
        });
      });
    }
  });