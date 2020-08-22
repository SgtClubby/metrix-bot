client.on('message', async message => {
  const defaulthelpstring = `${commandprefix}skin\n${commandprefix}serverinfo \n${commandprefix}usage \n${commandprefix}help \n${commandprefix}avatar \n${commandprefix}suggestion \n${commandprefix}osu \n${commandprefix}meme \n${commandprefix}prefix \n${commandprefix}poll\n\n Type **${commandprefix}help command** to see a detailed explanation on how to use the command.`
    const help = () => {  
      switch (args[0]) {
        case "testcommand":
        message.channel.send({embed: {
          color: 6329542,
          title: "testcommand",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: "Lorem ipsim dera isum metas, Testi Commandie",
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      }) ;
          break
        case "ping":
        message.channel.send({embed: {
          color: 6329542,
          title: "Ping",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: `Use ${commandprefix}ping to see if bot is alive.`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      })
          break
        case "avatar":
        message.channel.send({embed: {
          color: 6329542,
          title: "Avatar",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: `Use ${commandprefix}avatar to see own avatar. \n\n If you mention a user, it will return the \n mentioned users avatar.  \n (This works for multiple mentions)`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      })
          break
        case "info": 
        message.channel.send({embed: {
          color: 6329542,
          title: "Info",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: `Type ${commandprefix}info to see information \n about the bot.`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      })
          break
        case "help":
          message.channel.send({embed: {
            color: 6329542,
            title: "Help",
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
            },
            fields: [{
                name: "**Usage:**",
                value: `Use ${commandprefix}help + a command to receive \n information about what a command does. \n\n This commands also shows list of all available commands.`,
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:  message.author.tag
            }
          }   
        })
          break
        case "serverinfo": 
        message.channel.send({embed: {
          color: 6329542,
          title: "Serverinfo",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: `Use ${commandprefix}serverinfo + a Minecraft Server IP Address with an optional server port. \n \n This will return if the provided server is online and how many players are playing. \n\n **Example:** ${commandprefix}serverinfo mc.hypixel.net:25565 \n *Note! If you don't provide a port then it will default to port 25565.*`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      })
          break
        case "meme": 
        message.channel.send({embed: {
          color: 6329542,
          title: "Meme",
          thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
          },
          fields: [{
              name: "**Usage:**",
              value: `Type ${commandprefix}meme to make the bot send a random meme.`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL,
            text:  message.author.tag
          }
        }   
      })
          break
        case "usage":
          message.channel.send({embed: {
            color: 6329542,
            title: "Usage",
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
            },
            fields: [{
                name: "**Usage:**",
                value: `Use ${commandprefix}usage to get a report on the current CPU and RAM usage on the computer running the bot.`,
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:  message.author.tag
            }
          }   
        })
          break
        case "skin":
            message.channel.send({embed: {
              color: 6329542,
              title: "Skin",
              thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
              },
              fields: [{
                  name: "**Usage:**",
                  value: `Use ${commandprefix}skin to get the skin of the player you mention. \n\n **Example:** ${commandprefix}skin Notch`,
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: message.author.displayAvatarURL,
                text:  message.author.tag
              }
            }   
          })
            break
          case "poll":
            message.channel.send({embed: {
              color: 6329542,
              title: "Poll",
              thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
              },
              fields: [{
                  name: "**Usage:**",
                  value: `Use ${commandprefix}poll to make a poll/vote, votes are counted with the reactions ✅ and ⛔.  \n\n **Example:** ${commandprefix}poll What is the best sort of cat?`,
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: message.author.displayAvatarURL,
                text:  message.author.tag
              }
            }   
          })
            break
            case "suggestion":
              message.channel.send({embed: {
                color: 6329542,
                title: "Suggestion",
                thumbnail: {
                  url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
                },
                fields: [{
                    name: "**Usage:**",
                    value: `Use ${commandprefix}suggestion to make a suggestion for features or changes. \n\n **Example:** ${commandprefix}suggestion tweak the avatar command`,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: message.author.displayAvatarURL,
                  text:  message.author.tag
                }
              }   
            })
              break
          case "osu":
            message.channel.send({embed: {
              color: 6329542,
              title: "**Usage:**",
              thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
              },
              fields: [{
                  name: "**Osu:**",
                  value: `Use ${commandprefix}osu to get Osu! user information. \n\n **Example:** ${commandprefix}osu WhiteCat`,
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: message.author.displayAvatarURL,
                text:  message.author.tag
              }
            }   
          })
            break
        case "commands":
          message.channel.send({embed: {
            color: 6329542,
            author: {
              name: "",
              icon_url: ""
            },
            title: "Commands",
            url: "",
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
            },
            fields: [{
                name: "**Available commands:**",
                value: defaulthelpstring,
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:  message.author.tag
            }
          } 
        }) 
          break
        default:
          message.channel.send({embed: {
            color: 6329542,
            author: {
              name: "",
              icon_url: ""
            },
            title: "Commands",
            url: "",
            thumbnail: {
              url: 'https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png',
            },
            fields: [{
                name: "**Available commands:**",
                value: defaulthelpstring,
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
    }
  exports.help = help
})