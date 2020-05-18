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
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setActivity(`type ${prefix}help`);
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
  var avatarblue = "#6094c6"

  const usage = await currentloadData().catch(console.log)

//==================================================================================================
//||   Command Ping
//==================================================================================================

    if (command === "ping") {
      console.log(message.author.tag + " called command " + command + "!")
      message.channel.send("Pong!")
    }

//==================================================================================================
//||   Command info
//==================================================================================================

if (command === "info") {
  console.log(message.author.tag + " called command " + command + "!")
    message.channel.send({embed: {
      color: avatarblue,
      author: {
        name: "Some info about me!",
        icon_url: ""
      },
      description: `Hello! I am Metrix! \n Version: A0.6 \n My owner and developer is Clomby#1466        \n \n For my command list, use \n ${prefix}help`,
      thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/694507739292106843/711564085124268143/1231-01.jpg',
      },
      title: "",
      url: " ",
      timestamp: new Date(),
      footer: {
        icon_url: message.author.displayAvatarURL(),
        text:  message.author.tag
    }
  }
});
}

//==================================================================================================
//||   Command Avatar
//==================================================================================================

    if (command === "avatar") {
      console.log(message.author.tag + " called command " + command + "!")
      console.log(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
      if (!message.mentions.users.size) {
        return message.channel.send({embed: {
          color: avatarblue,
          author: {
            name: "",
            icon_url: ""
          },
          title: "Your avatar:",
          image: {
            url: `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`,
          },
          timestamp: new Date(),
        }   
      })
      } 

      const avatarList = message.mentions.users.map(user => {
        return `${user.displayAvatarURL({ format: "png", dynamic: true })}`;

      });  
      avatarList.forEach(element => {
        message.channel.send({embed: {
          color: avatarblue,
          author: {
            name: "",
            icon_url: ""
          },
          title: "",
          image: {
            url: `${element }`,
          },
          timestamp: "",
        }   
      })
      });

    }

//==================================================================================================
//||   Command Change Prefix
//==================================================================================================


    const changePrefix = {
      prefix: `${args[0]}`,
    }
    const jsonString = JSON.stringify(changePrefix)

    if (command === "prefix") {
      console.log(message.author.tag + " called command " + command + "!")
      if (!args.length) {
        return message.channel.send(`Please enter a prefix, ${message.author}!`);
      }
      
    else if (args[0].length > 1) {
      return message.channel.send(`Please provide a valid prefix of length 1, ${message.author}!`);
      }
    
    fs.writeFile('./prefix.json', jsonString, err => {
      if (err) {
          console.log('Error writing to file!', err)
      } else {
          console.log('Successfully updated prefix!')
      }
    })

    message.channel.send("Success! The prefix has been changed to " + args[0] + " " + `${message.author}`)
    }

//==================================================================================================
//||   Command Usage
//==================================================================================================

// Changes color of Embed based on CPU Load

if (usage >= 100) {
  usageColor = red;
} else if (usage >= 50) {
    usageColor = orange;
  } else if (usage >= 25) {
      usageColor = yellow;
    } else {
        usageColor = green;
}    

  var mem = process.memoryUsage().heapUsed / 1024 / 1024        // Gets current memory usage
//var totalmem = os.totalmem / 1024 / 1024 / 1024               // Gets total system memory
	var totalmem = process.memoryUsage().heapTotal / 1024 / 1024

	if (command === "usage") {
    console.log(message.author.tag + " called command " + command + "!")
    console.log("CPU usage was " + usage.toFixed(2) + "%")
    console.log("RAM usage was " + mem.toFixed(2) + " GB / " + totalmem.toFixed(2) + " GB")
    message.channel.send({embed: {
        color: usageColor,
        author: {
          name: "",
          icon_url: ""
        },
        title: "Server resources",
        url: "",
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
          text:  message.author.tag
        }
       }
    })
  }	    	

//==================================================================================================
//||   Command Help
//==================================================================================================

  if (command === "help") {
    console.log(message.author.tag + " called command " + command + "!")
    message.channel.send({embed: {
        color: avatarblue,
        author: {
          name: "",
          icon_url: ""
        },
        title: "Commands",
        url: "",
        thumbnail: {
          url: 'https://cdn.discordapp.com/attachments/694507739292106843/711564085124268143/1231-01.jpg',
        },
        fields: [{
            name: "**Available commands:**",
            value: prefix + "serverinfo \n" + prefix + "usage \n" + prefix + "help \n" + prefix + "avatar \n" + prefix + "prefix \n",
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.displayAvatarURL(),
          text:  message.author.tag
        }
      }   
    })
  }		

//==================================================================================================
//||   Command Serverinfo
//==================================================================================================

  if (command === "serverinfo") {
    console.log(message.author.tag + " called command " + command + "!")
  var statusColor = 0
  const user = message.mentions.users.first() || message.author;

 // if (!args.length) {
//    return message.channel.send(`Please enter a Minecraft server IP address and port, ${message.author}!`);
//    }

      var url = 'http://mcapi.us/server/status?ip=' + config.mcIP + '&port=' + config.mcPort;
      //var url = 'http://mcapi.us/server/status?ip=' + args[0] + '&port=' + args[1];
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
                  console.log(status)
              } else {
                  status += 'Nobody is playing!';
                  console.log(status)
              }
          }
        message.channel.send({embed: {
            color: statusColor,
            author: {
              name: "",
              icon_url: ""
            },
            title: "Minecraft Server Status",
            url: "",
            fields: [{
                name: "**Server:**",
                value: config.mcIP + ":" + config.mcPort
                //value: args[0] + ":" + args[1]
              },
              {
                name: "**Status:**",
                value: status
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL(),
              text:  message.author.tag
          }
        }
      });
    });
  }
});