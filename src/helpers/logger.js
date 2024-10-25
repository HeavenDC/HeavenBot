const { PrismaClient } = require('@prisma/client')
const { container } = require('@sapphire/framework')
const { EmbedBuilder, Colors, GuildMember, CommandInteraction } = require('discord.js')

class Logger {
    constructor() {
        this.config = require('../configs/config')
        this.db = new PrismaClient()
    }

    async chatLogs(embedTitle, embedDescription, embedColor, embedFields) {
        const guild = await container.client.guilds.fetch(this.config.defaultGuildId[0])
        const channel = await guild.channels.fetch(this.config.channels.mainLogs)

        if (!guild || !channel) {
            throw new Error('Guild or channel not found')
        }

        const embed = new EmbedBuilder({
            title: embedTitle || '',
            description: embedDescription || '',
            color: embedColor || Colors.Default,
            fields: embedFields || [],
            footer: {
                text: 'HeavenBot | All rights reserved',
                iconURL: container.client.user.displayAvatarURL()
            },
            timestamp: new Date()
        })

        channel.send({ embeds: [embed] })
    }

    /**
     * 
     * @param {GuildMember} member 
     */
    async memberJoin(member) {
        const embed = new EmbedBuilder({
            title: '👤 HeavenLogs > Membres',
            description: `${member.user.username} vient de rejoindre le serveur.`,
            fields: [
                {
                    name: 'ID',
                    value: member.id,
                    inline: true
                },
                {
                    name: 'Mention',
                    value: `<@${member.id}>`,
                    inline: true
                },
                {
                    name: 'Création du compte',
                    value: member.user.createdAt.toLocaleString('fr-FR'),
                    inline: true
                }
            ],
            footer: {
                text: 'HeavenBot | All rights reserved',
                iconURL: container.client.user.displayAvatarURL()
            },
            timestamp: new Date(),
            color: Colors.Purple
        })

        const channel = await container.client.guilds.fetch(this.config.defaultGuildId[0]).then(guild => guild.channels.fetch(this.config.channels.mainLogs))
        channel.send({ embeds: [embed] })
    }

    /**
     * 
     * @param {GuildMember} member 
     */
    async memberLeave(member) {
        const embed = new EmbedBuilder({
            title: '👤 HeavenLogs > Membres',
            description: `${member.user.username} vient de quitter le serveur.`,
            fields: [
                {
                    name: 'ID',
                    value: member.id,
                    inline: true
                },
                {
                    name: 'Rejoint le',
                    // date en dd/mm/yyyy hh:mm
                    value: member.joinedAt.toLocaleString('fr-FR'),
                    inline: true
                }
            ],
            footer: {
                text: 'HeavenBot | All rights reserved',
                iconURL: container.client.user.displayAvatarURL()
            },
            timestamp: new Date(),
            color: Colors.Red
        })

        const channel = await container.client.guilds.fetch(this.config.defaultGuildId[0]).then(guild => guild.channels.fetch(this.config.channels.mainLogs))
        channel.send({ embeds: [embed] })
    }
}

module.exports = logger = new Logger()