
client.on('message', message => {
    const speedtest_test = async () => {
        msg = await message.channel.send({embed: {
            color: 6329542,
            title: "Please wait...",
          }   
        })
        var process = require('child_process');
        var cmd = process.spawn('speedtest',  ['--format=json']);
        cmd.stdout.on('data', function(output){
            output = output.toString();
            speed = JSON.parse(output)

            if (speed.error) return msg.edit(`Speedtest failed!\n**Error:**\n${speed.error}`)

                const image = speed.result.url
                
            msg.edit(({embed: {
                color: 1250347,
                image: {
                    url: `${image}.png`,
                   },
                  }   
            })
            )
        });

        cmd.on('close', function(){
        });

        //Error handling
        cmd.stderr.on('data', function(err){
            console.log(err);
        });
    }
    
    exports.speedtest_test = speedtest_test
    })