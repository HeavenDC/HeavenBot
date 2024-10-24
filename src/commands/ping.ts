import { Command } from '../structures/commandStructure';

export const pingCommand: Command = {
  name: 'ping',
  description: 'Replies with Pong!',
  isOwnerOnly: false,
  isBetaOnly: false,
  isMessageCommand: true,
  prefix: '!',

  // Slash command
  async execute(interaction) {
    await interaction.reply('Pong!');
  },

  // Message command
  async executeMessage(message, args) {
    await message.reply('Pong!');
  },
};