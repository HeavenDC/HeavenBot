import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { Event } from "../structures/Event";
import { Logger } from "../utils/Logger";
import { config } from "../config";

const betaGuilds = config.betaGuilds;

export class EventHandler {
    static async loadEvents(client: Client) {
        const eventFolders = readdirSync(path.join(__dirname, "../events"));

        for (const folder of eventFolders) {
            const eventFiles = readdirSync(path.join(__dirname, `../events/${folder}`)).filter(
                (file) => file.endsWith(".ts") || file.endsWith(".js")
            );

            for (const file of eventFiles) {
                const eventModule = await import(`../events/${folder}/${file}`);
                const event: Event = new eventModule.default();

                if (!event.enabled) continue;

                const execute = async (...args: any[]) => {
                    const [arg] = args;

                    if (event.betaGuildsOnly && arg.guild && !betaGuilds.includes(arg.guild.id)) {
                        return;
                    }

                    await event.run(...args);
                };

                if (event.once) {
                    client.once(event.name, execute);
                } else {
                    client.on(event.name, execute);
                }
            }
        }

        Logger.consoleLog(
            `Loaded events (${client.eventNames().length})`,
            'debug'
        )
    }
}