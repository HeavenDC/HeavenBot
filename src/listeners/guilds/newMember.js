const { Listener, Events } = require('@sapphire/framework');
const logger = require('../../helpers/logger');
const { Colors, GuildMember, EmbedBuilder } = require('discord.js');
const config = require('../../configs/config');

class GuildListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: Events.GuildMemberAdd
        });
    }

    /**
     * 
     * @param {GuildMember} member 
     */
    async run(member) {
        const randomMessage = [
            `Un petit cadeau de bienvenue ${member.user} ?`,
            `Un tonnerre d'applaudissements pour l'arrivée de ${member.user} !`,
            `Oh, regardez qui vient de nous rejoindre ! Bienvenue ${member.user} !`,
        ]

        const arrivalChannel = await (await this.container.client.guilds.fetch(config.defaultGuildId[0])).channels.fetch(config.channels.arrivals)
        const communityChannel = await (await this.container.client.guilds.fetch(config.defaultGuildId[0])).channels.fetch(config.channels.global)

        await arrivalChannel.send({
            content: `${member.user}`,
            embeds: [
                new EmbedBuilder({
                    title: '👋 Nouveau membre',
                    description: `**${member.user.username}** vient tout juste de rejoindre le serveur !\n
                    > Avant toute chose, je t'invite à prendre connaissance du règlement dans <#1056394180378767440>, et à récupérer tes derniers rôles dans <#1056394209663385611>, qui sont **obligatoires** !\n
                    L'équipe de Modération d'Heaven reste à ta disposition pour toute question ou problème 💖`,
                    color: Colors.Blue,
                    footer: {
                        text: 'HeavenBot | All rights reserved',
                        iconURL: this.container.client.user.displayAvatarURL()
                    },
                    timestamp: new Date()
                })
            ]
        })
        communityChannel.send({
            content: randomMessage[Math.floor(Math.random() * randomMessage.length)]
        })
        logger.memberJoin(member);
    }
}
module.exports = {
    GuildListener
};