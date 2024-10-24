import { PermissionResolvable, ChatInputCommandInteraction, Message } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  userPermissions?: PermissionResolvable[];
  clientPermissions?: PermissionResolvable[];
  isOwnerOnly?: boolean;
  isBetaOnly?: boolean;
  isMessageCommand?: boolean;
  prefix?: string;

  execute?(interaction: ChatInputCommandInteraction): Promise<void>;

  executeMessage?(message: Message, args: string[]): Promise<void>;
}