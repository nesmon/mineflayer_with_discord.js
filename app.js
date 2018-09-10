const mineflayer = require('mineflayer')
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const prefix = config.prefix

// Mineflayer connection configurtation
const minecraft = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.server.color + config.server.username
})

// When the bot is on
client.on('ready', () => {
  console.log(`Logged in as ${minecraft.username} on Minecraft!`)
  console.log(`Logged in as ${client.user.tag} on Discord!`)
  console.log('')
})

// Send message on discord
client.on('message', message => {
  if (message.content.startsWith(prefix)) {
    const msgContent = message.author.username + ': ' + message.content.substr(prefix.length).trim()
    minecraft.chat(msgContent)
  }
})

minecraft.on('chat', function (username, message) {
  if (config.server.color + username === minecraft.username) return
  const sendMessage = '**' + username + ':**\n' + message
  sendToDiscord(sendMessage)
})

// Function to get minecraft message on discord.
function sendToDiscord (message) {
  const log = client.channels.find('name', config.discordChannelName)
  console.log('Send message !')
  log.send(message)
}

client.login(config.token)
