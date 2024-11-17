import { ActivityType, PresenceStatusData } from "discord.js";

export const config = {
    betaGuilds: ['1020405855277023273'],
    botOwners: ['716639931610562563', '149552169467510784'],
    presence: {
        name: 'le monde !',
        type: ActivityType.Watching,
        status: 'online' as PresenceStatusData
    },

    channels: {
        arrivals: '1056394183390277712',
        rules: '1056394180378767440',
        announcements: '1056394191799849000',
        discussions: '1056394219289313310',
        commands: '1056394225882779708',
        anonym: '1223674596381692085',
        autoVocal: '1056394229766688898',
        globalLogs: '1218219464320094339',
        ticketsLogs: '1100837825416527995',
        anonymLogs: '1104082369083879444',
        ticketsOpenCategory: '1060044156472414228',
        ticketsCloseCategory: '1060044156472414228'
    }
}