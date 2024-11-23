import './lib/setup';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';
import { config } from './configs/config';

const client = new SapphireClient({
    defaultPrefix: '!',
    regexPrefix: /^(hey +)?bot[,! ]/i,
    caseInsensitiveCommands: true,
    logger: {
        level: LogLevel.Debug
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel],
    loadMessageCommandListeners: true,
    presence: config.presence
});

const main = async () => {
    try {
        client.logger.info('Logging in');
        await client.login(process.env.DISCORD_TOKEN);
        client.logger.info('logged in');
    } catch (error) {
        client.logger.fatal(error);
        await client.destroy();
        process.exit(1);
    }
}

void main();