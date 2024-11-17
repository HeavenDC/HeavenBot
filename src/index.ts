import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import 'dotenv/config';
import { CommandHandler } from "./handlers/CommandHandler";
import { EventHandler } from "./handlers/EventHandler";
import { Logger } from "./utils/Logger";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],

    presence: {
        activities: [{
            name: config.presence.name,
            type: config.presence.type
        }],
        status: config.presence.status
    }
});

(async () => {
    try {
        try {
            await EventHandler.loadEvents(client);
            await client.login(process.env.TOKEN);

            await CommandHandler.loadCommands(client);
        } catch (error) {
            Logger.consoleLog(`Erreur au démarrage du bot: ${error}`, "error");
            process.exit(1);
        }
    } catch (error) {
        console.error(error);
    }
})();