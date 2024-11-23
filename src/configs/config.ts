import { ActivityType, PresenceData } from "discord.js";

export const config = {
    presence: {
        status: 'online',
        activities: [
            {
                name: `in development...`,
                type: ActivityType.Watching
            }
        ]
    } as PresenceData
}