require('dotenv').config()
const auth = require('./auth.json')

// Import necessary Discord.js classes
const { Client, Intents } = require('discord.js');

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
        msg.content = msg.content.toLowerCase();
        if (msg.content === "arka gdynia"){
            msg.reply("kurwa świnia!")
        }
    })