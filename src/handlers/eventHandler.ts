import { Client } from 'discord.js'
import { readdirSync } from 'fs';
import { join } from 'path';

export const loadEvents = (client: Client) => {
    const eventPath = join(__dirname, '../events');
    const eventFiles = readdirSync(eventPath).filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const event = require(`${eventPath}/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    }
}