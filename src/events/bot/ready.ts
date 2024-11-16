import { Event } from "../../structures/Event";
import { Client } from "discord.js";
import { Logger } from "../../utils/Logger";

export default class Ready extends Event {
    constructor() {
        super({
            name: "ready",
            once: true,
            enabled: true,
        });
    }

    async run(client: Client) {
        Logger.consoleLog(`Connected on ${client.user?.username}`, "info");
    }
}