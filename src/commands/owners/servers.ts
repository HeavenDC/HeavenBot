import { client } from "../..";
import { Command } from "../../structures/Command";
import { Colors, EmbedBuilder, Guild, SlashCommandBuilder } from "discord.js";

export default class Servers extends Command {
    constructor() {
        super({
            data: new SlashCommandBuilder()
                .setName("servers")
                .setDescription("Show all servers the bot is in."),
            botOwnerOnly: true
        });
    }

    async execute(interaction: any): Promise<void> {
        const embed = new EmbedBuilder({
            title: '🏠 HeavenBot servers',
            description: `> Here is all the servers HeavenBot is in. Total servers: \`\`${client.guilds.cache.size}\`\``,
            color: Colors.Gold,
            timestamp: new Date()
        })

        client.guilds.cache.forEach((guild: Guild) => {
            const owner = guild.ownerId ? guild.members.cache.get(guild.ownerId) : null;
            const ownerName = owner ? owner.user.tag : "Unknown";
            const memberCount = guild.memberCount;
            const createdAt = guild.createdAt.toLocaleDateString();
            const joinedAt = guild.members.cache.get(client.user!.id)?.joinedAt?.toLocaleDateString() || "Unknown";

            // Ajouter un field à l'embed pour chaque guilde
            embed.addFields({
                name: guild.name,
                value: `Owner: \`\`${ownerName}\`\`\nMembers: \`\`${memberCount}\`\`\nCreated At: \`\`${createdAt}\`\`\nJoined At: \`\`${joinedAt}\`\``,
                inline: false,
            });
        });

        // Envoyer l'embed
        await interaction.reply({ embeds: [embed] });
    }
}