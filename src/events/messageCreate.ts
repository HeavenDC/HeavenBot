import { Message } from 'discord.js';
import { handleMessageCommand } from '../handlers/commandHandler';

module.exports = async (client: any, message: Message) => {
  await handleMessageCommand(message, client);
};