import chalk = require("chalk")
import { ChannelType, EmbedBuilder, GuildChannel } from "discord.js";
import { client } from "..";

type LoggerType = 'info' | 'warn' | 'error' | 'debug';

export class Logger {
    /**
     * Logs a message to the console
     * @param message The message to log
     * @param type The type of log
     */
    static consoleLog(message: String, type: LoggerType) {
        const actualDate = new Date().toLocaleTimeString();

        switch (type) {
            case 'info':
                console.log(chalk.white(`[INFO] ${chalk.gray(`[${actualDate}]`)} ${message}`));
                break;
            case 'warn':
                console.log(chalk.yellow(`[WARN] ${chalk.gray(`[${actualDate}]`)} ${message}`));
                break;
            case 'error':
                console.log(chalk.red(`[ERROR] ${chalk.gray(`[${actualDate}]`)} ${message}`));
                break;
            case 'debug':
                console.log(chalk.blue(`[DEBUG] ${chalk.gray(`[${actualDate}]`)} ${message}`));
                break;
            default:
                console.log(chalk.white(`[INFO] ${chalk.gray(`[${actualDate}]`)} ${message}`));
                break;
        }
    }

    /**
     * Logs a message to a channel
     * @param guildChannel The channel to log to
     * @param logMessage The message to log
     * @param embed The embed to send
     * @returns 
     */
    static async channelLog(guildChannel: GuildChannel, logMessage?: string, embed?: EmbedBuilder) {
        const channel = await client.channels.fetch(guildChannel.id);

        if (channel == null) 
            return this.consoleLog(`Channel with ID ${guildChannel.id} not found`, 'error');

        if (channel.type !== ChannelType.GuildText) 
            return this.consoleLog(`Channel with ID ${guildChannel.id} is not a text channel`, 'error');

        if (embed) {
            await channel.send({ embeds: [embed] });
        } else {
            await channel.send({
                content: logMessage
            });
        }
    }
}