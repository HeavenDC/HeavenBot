import { SlashCommandBuilder } from "discord.js";

interface CommandOptions {
    data: SlashCommandBuilder;
    betaGuildsOnly?: boolean;
    botOwnerOnly?: boolean;
}

export abstract class Command {
    data: SlashCommandBuilder;
    betaGuildsOnly: boolean;
    botOwnerOnly: boolean;

    constructor(options: CommandOptions) {
        this.data = options.data;
        this.betaGuildsOnly = options.betaGuildsOnly || false;
        this.botOwnerOnly = options.botOwnerOnly || false;
    }

    abstract execute(interaction: any): Promise<void>;
}