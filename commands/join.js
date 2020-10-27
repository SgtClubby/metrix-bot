client.on('message', async message => {
  const joinchannel = async() => {

    switch (args[0]) {
      case "connect":
        var channel = client.channels.cache.get(args[1]);
        if (!channel) return console.log("The channel does not exist!");
        channel.join().then(connection => {
          console.log("Successfully connected.");
        }).catch(e => {
          console.log(e);
        });
        break

      case "disconnect":
        var channel = client.channels.cache.get(args[1]);
        if (!channel) return console.log("The channel does not exist!");
        channel.leave()
        console.log("Successfully disconnected.")
        break

      case "reconnect":
        if (!args[2] === undefined) args[2] = 15000
        var channel = client.channels.cache.get(args[1]);
        if (!channel) return console.log("The channel does not exist!");
        channel.join().then(connection => {
          console.log("Successfully connected.")
        }).catch(e => {
          console.log(e);
        });
        
        setTimeout(async function () {
          var channel = client.channels.cache.get(args[1]);
          if (!channel) return console.log("The channel does not exist!");
          channel.leave()
          console.log("Successfully disconnected.")
        }, args[2])
        break

      case "send":
        client.users.cache.get(args[1]).send(args[2]);
        break
    }
  }

  exports.joinchannel = joinchannel
})