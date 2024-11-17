import { Event } from "../../structures/Event";
import { Client, Events } from "discord.js";
import { Logger } from "../../utils/Logger";

export default class Ready extends Event {
    constructor() {
        super({
            name: Events.ClientReady,
            once: true,
            enabled: true,
        });
    }

    async run(client: Client) {
        Logger.consoleLog(`Connected on ${client.user?.username}`, "info");
    }
}