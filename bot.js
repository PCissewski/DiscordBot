require('dotenv').config()
const auth = require('./auth.json')

const logger = require('winston')

const weekDays= new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

let republikaID = "983414702329725009";

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Import necessary Discord.js classes
const { Client, Intents, Message} = require('discord.js');

// Instantiate new client object with desired Intents
const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Authenticate
client.login(auth.token)

// Notify successful connection via console
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
    papajHour()
})

// Wait for message events, check content for match,
// respond cordially to user via reply.
client.on('message',
    function(msg){
        
        for (let i = 0; i < weekDays.length; i++) {
            const element = weekDays[i] + " 18:00";
            if (msg.author.id === client.user.id && msg.content === element){
                msg.react('✅')
                msg.react('❌')
            }

        }

        if (msg.author.id === client.user.id)
            return

        msg.content = msg.content.toLowerCase();
        const channel = msg.channel

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
        case 'noga-termin':
            createPoll(channel)
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
        case "ciombor":
            msg.reply("pedał")
            channel.send(":3")
            break;
        case ":3":
            channel.send(":3")
            break;
        default:
            break;
    }
}

function papajHour() {
    const currentDate = new Date()
    //republikaID.send(currentDate)
    console.log(currentDate)
}

function createPoll(channel) {
    for (let i = 0; i < weekDays.length; i++) {
        var element = weekDays[i];
        channel.send(element + " 18:00")
    }
}
