const si = require('systeminformation')
var usageColor = 0
var red = 15158332                                            // Assigns color red
var orange = 15105570                                         // Assigns color orange
var yellow = 15844367                                         // Assigns color yellow 
var green = 6729778                                           // Assigns color green

async function currentloadData() {
    try {
      const data = await si.currentLoad()
      return data.currentload
    } catch (e) {
      throw e
    }
  }

client.on('message', async message => {

const usage = await currentloadData().catch(console.log)

if (usage >= 100) {
    usageColor = red
  } else if (usage >= 50) {
      usageColor = orange
    } else if (usage >= 25) {
        usageColor = yellow
      } else {
          usageColor = green
  }    
  
    var mem = process.memoryUsage().heapUsed / 1024 / 1024        // Gets current memory usage
  //var totalmem = os.totalmem / 1024 / 1024 / 1024               // Gets total system memory
      var totalmem = process.memoryUsage().heapTotal / 1024 / 1024
  
      const pcusage = () => {
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
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
         }
      })
    }
    
exports.pcusage = pcusage
})	    	