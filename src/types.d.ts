import { Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args: any) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    betaGuild?: boolean | false,
    execute: (interaction : CommandInteraction) => Promise<void>,
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string
            TOKEN: string,
            BETA_GUILDS: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}