const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const msg = new Discord.Message()
  const log = client.channels.find('name', config.discordChannelName)
  msg.content = 'message'
  log.send('hello')
})

client.login(config.token)
