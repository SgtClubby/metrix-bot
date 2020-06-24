
client.on('message', message => {
    const speedtest_test = async () => {
        msg = await message.channel.send("Please wait...")
        var process = require('child_process');
        var cmd = process.spawn('speedtest',  ['--format=json']);
        cmd.stdout.on('data', function(output){
            output = output.toString();
            speed = JSON.parse(output)

            if (speed.error) return msg.edit(`Speedtest failed!\n**Error:**\n${speed.error}`)
            const url = `${speed.result.url}.png`  
            msg.delete()
            message.channel.send({
                files: [{
                    attachment: url,
                    name: 'speedtest.png'
                }]
            })   
        });

        //Error handling
        cmd.stderr.on('data', function(err){
            console.log(err);
        });
    }
    
    exports.speedtest_test = speedtest_test
    })