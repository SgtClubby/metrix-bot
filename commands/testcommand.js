client.on('message', async message => {
const testcommand = () => {
    message.channel.send("This is the test command!")
};

exports.testcommand = testcommand;
})