const mineflayer = require('mineflayer');
const Discord = require('discord.js')
const discord = new Discord.Client();

const config = require('./config.json.examplett')
const prefix = config.prefix;

let minecraft = null;

// Function to get minecraft message on discord.
function sendToDiscord(message) {
    console.log(`Message à envoyer to discord ${message}`);
    const log = discord.channels.find('name', 'mineflayer-test');

    console.log("Send message !");
    log.send(message);
}



// Part Mineflayer and minecraft

minecraft = mineflayer.createBot({
    host: process.env.HOST || "localhost",
    port: process.env.PORT,
    username: config.minflayername,
});


minecraft.on('chat', function(username, message) {
    console.log(username, message)

    if (username === minecraft.username) {
        return;
    }

    sendToDiscord(message);

});



// Part discord.js and discord

discord.on('ready', () => {
    console.log(`Logged in as ${discord.user.tag} on Discord!`);
    console.log(`Logged in as ${minecraft.username} on Minecraft!`);
});

discord.on('message', msg => {
    if (msg.content.startsWith("mineflayer")) {
        const msgUser = msg.content
        var regex1 = /^mineflayer /
        minecraft.chat(msgUser.substr(msgUser.search(regex1) + "mineflayer".length).trim())
    }
});


discord.login(config.token);
