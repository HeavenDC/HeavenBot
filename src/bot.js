const { SapphireClient, ApplicationCommandRegistries } = require('@sapphire/framework')
const { GatewayIntentBits, ActivityType, Colors } = require('discord.js')
const { PrismaClient } = require('@prisma/client')
const config = require('./configs/config')
const chalk = require('chalk')
require('dotenv').config()

const express = require('express')
const logger = require('./helpers/logger')
const app = express()
const port = config.appPort

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ],

    presence: {
        status: config.botProcess === 'development' ? 'dnd' : 'online',
        activities: [{
            name: config.botProcess === 'development' ? 'EN DEV' : `v${config.botVersion} | by @plhume`,
            type: config.botProcess === 'development' ? ActivityType.Playing : ActivityType.Watching
        }]
    }
})

const prisma = new PrismaClient()

console.log(chalk.blue('* Starting the bot...'))
console.log(chalk.blue('* Bot process:', config.botProcess === 'development' ? chalk.red('development') : chalk.white('production')))
config.botProcess === 'development' ? console.log(chalk.blue('* In development mode, only beta servers and bot owner can use bot. ')) : null
console.log(chalk.blue('* Bot version:', chalk.white(config.botVersion)))
console.log(chalk.blue('* Bot codded by:', chalk.white('@plhume')))

async function main() {
    await ApplicationCommandRegistries.setDefaultGuildIds([config.defaultGuildId])
    await client.login(process.env.BOT_TOKEN)

    console.log(chalk.blue('* Bot started!'))
    
}

process.on('unhandledRejection', (err) => {
    console.error(err)
    prisma.$disconnect()
    process.exit(1)
})

main().catch(console.error)