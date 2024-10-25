-- CreateTable
CREATE TABLE `GuildUser` (
    `id` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `messageCount` INTEGER NOT NULL DEFAULT 0,
    `vocalTime` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guilds` (
    `id` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL DEFAULT '*',
    `arrivalChannel` VARCHAR(191) NULL,
    `departureChannel` VARCHAR(191) NULL,
    `announcementChannel` VARCHAR(191) NULL,
    `infoRanksChannel` VARCHAR(191) NULL,
    `communityChannel` VARCHAR(191) NULL,
    `anonymChannel` VARCHAR(191) NULL,
    `autoVocalChannel` VARCHAR(191) NULL,
    `mainLogsChannel` VARCHAR(191) NULL,
    `ticketsLogsChannel` VARCHAR(191) NULL,
    `anonymLogsChannel` VARCHAR(191) NULL,
    `openTicketsCategory` VARCHAR(191) NULL,
    `closeTicketsCategory` VARCHAR(191) NULL,
    `isBetaGuild` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
