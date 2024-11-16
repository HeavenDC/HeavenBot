import { ActivityType, PresenceStatusData } from "discord.js";

export const config = {
    betaGuilds: ['1020405855277023273'],
    botOwners: ['716639931610562563', '149552169467510784'],
    presence: {
        name: 'le monde !',
        type: ActivityType.Watching,
        status: 'online' as PresenceStatusData
    }
}