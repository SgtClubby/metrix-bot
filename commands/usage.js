const si = require('systeminformation')
var usageColor = 0
var red = 15158332                                            // Assigns color red
var orange = 15105570                                         // Assigns color orange
var yellow = 15844367                                         // Assigns color yellow 
var green = 6729778                                           // Assigns color green

async function usageData() {
    try {
      const cpu = await si.currentLoad()
      const memory = await si.mem()
      memoryJson = {
        usedMem: memory.used,
        totalMem: memory.total,
        cpuUage: cpu.currentload
      }
      return memoryJson
    } catch (e) {
      throw e
    }
  }


client.on('message', async message => {

  const data = await usageData().catch((error) => message.channel.send(error))
  const used = data.usedMem / 1024 / 1024 / 1024     // Gets current memory usage
  const total = data.totalMem / 1024 / 1024 / 1024   // Gets total system memory
  const usage = data.cpuUage

  if (usage >= 100) {
      usageColor = red
    } 
  else if (usage >= 50) {
      usageColor = orange
    } 
  else if (usage >= 25) {
      usageColor = yellow
    }
  else {
      usageColor = green
    }    
   
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
            value: used.toFixed(2) + " GB / " + total.toFixed(2) + " GB"
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
    
exports.pcusage = pcusage
})	    	