const Discord = require('discord.js');
client.on('message', async message => {
    const mee6calc = () => {
        function calculate()
            {
                //Constants
                var min_xp_gain_per_message = 15;
                var max_xp_gain_per_message = 25;

                //Input from user
                var desired_level = args[0]
                var current_xp = args[1]

                if (!args[0] || !args[1]) {
                    return `**USAGE:** mee6calc <desired level> <current xp>`
                }

                //Magical math functions
                var xp_to_desired_level = 5 / 6 * desired_level * (2 * desired_level * desired_level + 27 * desired_level + 91);
                var xp_needed = xp_to_desired_level - current_xp;

                //Minimum, average, and maximum messages needed to send in order to reach specified level
                var min_messages_needed_to_send = Math.ceil(xp_needed / max_xp_gain_per_message);
                var avg_messages_needed_to_send = Math.ceil(xp_needed / ((min_xp_gain_per_message + max_xp_gain_per_message) / 2));
                var max_messages_needed_to_send = Math.ceil(xp_needed / min_xp_gain_per_message);

                //Display information to user

                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('MEE6 XP / Level Calculator')
                .setURL('https://mee6.xyz/')
                .setThumbnail('https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.webp')
                .setDescription(`
                ▸ **Average msgs needed**: ${avg_messages_needed_to_send}\n
                ▸ **XP Needed**: ${xp_needed.toFixed(0)}\n
                ▸ **Minimum msgs needed**: ${min_messages_needed_to_send}\n
                ▸ **Maximum msgs needed**: ${max_messages_needed_to_send}\n\n
                **NOTE**: _Messages can only be sent every minute!_
                `)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL());
                return embed
            }
            message.channel.send(calculate())
    }
    
    exports.mee6calc = mee6calc
    })