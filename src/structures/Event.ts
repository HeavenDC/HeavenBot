import { client } from "..";

interface EventOptions {
    name: string;
    once?: boolean;
    enabled?: boolean;
    betaGuildsOnly?: boolean;
}

export abstract class Event {
    name: string;
    once: boolean;
    enabled: boolean;
    betaGuildsOnly: boolean;

    constructor(options: EventOptions) {
        this.name = options.name;
        this.once = options.once || false;
        this.enabled = options.enabled ?? true;
        this.betaGuildsOnly = options.betaGuildsOnly || false;
    }

    abstract run(...args: any[]): Promise<void>;
}