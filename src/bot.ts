import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config/config';
import { loadEvents } from './handlers/eventHandler';
import { loadCommands } from './handlers/commandHandler';
import { mysqlManager } from './managers/databaseManager';
import 'dotenv/config';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
    ],

    presence: {
        status: config.presence.status,
        activities: [{
            name: config.presence.name,
            type: config.presence.type
        }]
    }
});

client.commands = new Collection();

loadEvents(client);
loadCommands(client);

client.login(process.env.BOT_TOKEN);

process.on('SIGINT', () => {
  console.log('Closing MySQL connection...');
  mysqlManager.close();
  process.exit();
});