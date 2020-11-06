version = require("../requirements")
client.on('message', async message => {
	servers = await totalserver
	const info = () => {
		{
			message.channel.send({
				embed: {
					color: 6329542,
					author: {
						name: "Some info about me!",
						icon_url: ""
					},
					description: `Hello! I am Metrix!
                         	Version ${version}
                         	I'm a part of ${servers} servers
                        	
                         	My owner and developer is Clomby#1466
                         	
                         	GitHub repositories: 
                          	https://github.com/SgtClubby/metrix-bot  
							https://github.com/SgtClubby/metrix-api
							  

                          	For my command list, use
                          	*${commandprefix}help*`,
					thumbnail: {
						url: "https://cdn.discordapp.com/attachments/715480344949817419/719324801398997022/logo.png",
					},
					title: "",
					url: "",
					timestamp: new Date(),
					footer: {
						icon_url: message.author.displayAvatarURL(),
						text: message.author.tag
					}
				}
			});
		}
	};
	exports.info = info;
})