import { Interaction } from 'discord.js';
import { Command } from '../structures/commandStructure';
import { config } from '../config/config';

module.exports = async (client: any, interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName) as Command;
  if (!command || command.isMessageCommand === false) return;

  // Vérifier les permissions utilisateur
  if (command.userPermissions) {
    const hasPermissions = command.userPermissions.every(permission => interaction.memberPermissions?.has(permission));
    if (!hasPermissions) {
      return interaction.reply({ content: 'You do not have the required permissions to execute this command.', ephemeral: true });
    }
  }

  // Vérifier les permissions du bot
  if (command.clientPermissions) {
    const botMember = interaction.guild?.members.me;
    const hasBotPermissions = command.clientPermissions.every(permission => botMember?.permissions.has(permission));
    if (!hasBotPermissions) {
      return interaction.reply({ content: 'I do not have the required permissions to execute this command.', ephemeral: true });
    }
  }

  // Vérifier si la commande est réservée au propriétaire
  if (command.isOwnerOnly && interaction.user.id !== config.ownerId) {
    return interaction.reply({ content: 'This command is only available to the bot owner.', ephemeral: true });
  }

  // Vérifier si la commande est en bêta
  if (command.isBetaOnly && !config.betaTesters.includes(interaction.user.id)) {
    return interaction.reply({ content: 'This command is only available to beta testers.', ephemeral: true });
  }

  try {
    if (interaction.isChatInputCommand()) {
      await command.execute?.(interaction);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
  }
};