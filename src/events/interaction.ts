import { BotEvent } from "../types";
import { Events, Interaction } from "discord.js";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.slashCommands.get(interaction.commandName);

        if (!command) return;
        if (interaction.guild == null) return;

        if (command.betaGuild == true) {
            if (!process.env.BETA_GUILDS.includes(interaction.guild.id)) {
                return await interaction.reply({
                    content: ":x: Cette commande est en bêta et n'est pas disponible sur ce serveur !",
                    ephemeral: true
                });
            }
        }

        await command.execute(interaction);
    },
}

export default event;