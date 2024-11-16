import { Command } from "../../structures/Command";
import { SlashCommandBuilder } from "discord.js";

export default class Ping extends Command {
    constructor() {
        super({
            data: new SlashCommandBuilder().setName("ping").setDescription("Renvoie Pong!"),
        });
    }

    async execute(interaction: any) {
        await interaction.reply("Pong!");
    }
}