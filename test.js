const Discord = require('discord.js')
const discord = new Discord.Client();

const config = require('./config.json')
const prefix = config.prefix;

discord.on('ready', () => {
    console.log(`Logged in as ${discord.user.tag}!`);
    
    const msg = new Discord.Message();
    const log = discord.channels.find('name', 'mineflayer-test');
    msg.content = "message";
    log.send("hello");

});





discord.login(config.token)