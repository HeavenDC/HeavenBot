import { Client, Collection, Message, PermissionsBitField } from 'discord.js';

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, any>;
    }
}

import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from '../config/config';
import { Command } from '../structures/commandStructure';

export const loadCommands = (client: Client) => {
    client.commands = new Collection<string, Command>();
    const commandPath = join(__dirname, '../commands');
    const commandFiles = readdirSync(commandPath).filter(file => file.endsWith('.ts'));
  
    for (const file of commandFiles) {
      const command: Command = require(`${commandPath}/${file}`).pingCommand;  // ou la façon dont tu exportes tes commandes
      // Utiliser command.name au lieu de command.data.name
      if (command && command.name) {
        client.commands.set(command.name, command);
      } else {
        console.error(`La commande dans le fichier ${file} est mal formatée et ne possède pas de propriété 'name'.`);
      }
    }
  };

// Handle prefixed commands like !ping
export const handleMessageCommand = async (message: Message, client: Client) => {
    if (message.author.bot) return;
  
    // Vérification des préfixes pour chaque commande
    for (const command of client.commands.values()) {
      if (!command.isMessageCommand) continue;  // Si la commande n'est pas pour les messages, on passe à la suivante
  
      const prefix = command.prefix || config.prefix;  // Utiliser le préfixe défini pour la commande ou le préfixe global
      if (!message.content.startsWith(prefix)) continue;
  
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift()?.toLowerCase();
  
      if (commandName !== command.name) continue;
  
      // Vérifier les permissions utilisateur
      if (command.userPermissions) {
        const hasPermissions = command.userPermissions.every((permission: PermissionsBitField) => message.member?.permissions.has(permission));
        if (!hasPermissions) {
          return message.reply('You do not have the required permissions to execute this command.');
        }
      }
  
      // Vérifier les permissions du bot
      if (command.clientPermissions) {
        const botMember = message.guild?.members.me;
        const hasBotPermissions = command.clientPermissions.every((permission: PermissionsBitField) => botMember?.permissions.has(permission));
        if (!hasBotPermissions) {
          return message.reply('I do not have the required permissions to execute this command.');
        }
      }
  
      // Vérifier si la commande est réservée au propriétaire
      if (command.isOwnerOnly && message.author.id !== config.ownerId) {
        return message.reply('This command is only available to the bot owner.');
      }
  
      // Vérifier si la commande est en bêta
      if (command.isBetaOnly && !config.betaTesters.includes(message.author.id)) {
        return message.reply('This command is only available to beta testers.');
      }
  
      try {
        await command.executeMessage?.(message, args);
      } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
      }
    }
  };