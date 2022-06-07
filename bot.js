require('dotenv').config()
const auth = require('./auth.json')

const logger = require('winston')

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Import necessary Discord.js classes
const { Client, Intents} = require('discord.js');

// Instantiate new client object with desired Intents
const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Authenticate
client.login(auth.token)

// Notify successful connection via console
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
})

// Wait for message events, check content for match,
// respond cordially to user via reply.
client.on('message',
    function(msg){

        if (msg.author.id === client.user.id)
            return

        msg.content = msg.content.toLowerCase();
        const channel = msg.channel;

        if (msg.content[0] === "-") {
            handleCommands(msg, channel)
        }
        else {
            textRespond(msg, channel)
        }
    })

function handleCommands(msg, channel) {
    msg.content = msg.content.replace('-', '')
    
    switch (msg.content) {
        case 'ping':
            channel.send("Dupsko")
            break;
        case 'poll':
            createPoll()
            break;
        default:
            break;
    }
}

function textRespond(msg, channel) {
    msg.content = msg.content.toLowerCase();
    switch (msg.content) {
        case "arka gdynia":
            msg.reply("kurwa świnia!")
            break;
        case "jd":
            channel.send("jd")
            break;
        default:
            break;
    }
}

function createPoll() {

}