import { ActivityType, PresenceStatusData } from "discord.js";

export const config = {
    prefix: '!',  // Préfixe global par défaut
    ownerId: 'YOUR_OWNER_ID',  // Remplacer par l'ID du propriétaire du bot
    betaTesters: ['USER_ID_1', 'USER_ID_2'],  // Liste des IDs des testeurs bêta
    presence: {
        status: 'online' as PresenceStatusData,
        name: 'le monde !',
        type: ActivityType.Watching
    }
}