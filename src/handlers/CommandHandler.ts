import { Client, Collection, Interaction, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { Command } from "../structures/Command";
import { Logger } from "../utils/Logger";
import { config } from "../config";

const betaGuilds = config.betaGuilds
const botOwners = config.botOwners

export class CommandHandler {
    static commands: Collection<string, Command> = new Collection();

    static async loadCommands(client: Client) {
        const commandFolders = readdirSync(path.join(__dirname, "../commands"));

        for (const folder of commandFolders) {
            const commandFiles = readdirSync(path.join(__dirname, "../commands", folder)).filter(
                (file) => file.endsWith(".ts") || file.endsWith(".js")
            );

            for (const file of commandFiles) {
                const commandModule = await import(`../commands/${folder}/${file}`);
                const command: Command = new commandModule.default();
                CommandHandler.commands.set(command.data.name, command);
                await client.application?.commands.create(command.data);
            }
        }

        Logger.consoleLog(
            `Loaded commands (${CommandHandler.commands.size})`,
            "debug"
        );

        await this.deployCommands(client);

        client.on("interactionCreate", async (interaction: Interaction) => {
            if (!interaction.isCommand()) return;

            const command = CommandHandler.commands.get(interaction.commandName);
            if (!command) return;

            if (command.betaGuildsOnly && !betaGuilds.includes(interaction.guildId!)) {
                return interaction.reply({
                    content: "Cette commande est uniquement disponible dans les guildes beta.",
                    ephemeral: true,
                });
            }

            if (command.botOwnerOnly && !botOwners.includes(interaction.user.id)) {
                return interaction.reply({
                    content: "Vous n'avez pas la permission d'utiliser cette commande.",
                    ephemeral: true,
                });
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                Logger.consoleLog(`Erreur lors de l'exécution de ${command.data.name}: ${error}`, "error");
                await interaction.reply({
                    content: "Une erreur est survenue.",
                    ephemeral: true,
                });
            }
        });
    }

    static async deployCommands(client: Client) {
        const commands = CommandHandler.commands.map((command) => command.data.toJSON());
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

        try {
            for (const guild of config.betaGuilds) {
                await rest.put(
                    Routes.applicationGuildCommands(client.user!.id, guild),
                    { body: commands }
                );
            }

            Logger.consoleLog(
                `Deployed commands (${commands.length})`,
                "debug"
            );
        } catch (error) {
            Logger.consoleLog(`Erreur lors du déploiement des commandes: ${error}`, "error");
        }
    }
}