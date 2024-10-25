const { Listener, Events } = require('@sapphire/framework');
const logger = require('../../helpers/logger');
const { Colors, GuildMember, EmbedBuilder } = require('discord.js');
const config = require('../../configs/config');

class GuildListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: Events.GuildMemberRemove
        });
    }

    /**
     * 
     * @param {GuildMember} member 
     */
    async run(member) {
        const arrivalChannel = await (await this.container.client.guilds.fetch(config.defaultGuildId[0])).channels.fetch(config.channels.arrivals)

        await arrivalChannel.send({
            embeds: [
                new EmbedBuilder({
                    title: '😭 Un membre est parti',
                    description: `**${member.user.username}** est parti...\n`,
                    color: Colors.Blue,
                    footer: {
                        text: 'HeavenBot | All rights reserved',
                        iconURL: this.container.client.user.displayAvatarURL()
                    },
                    timestamp: new Date()
                })
            ]
        })
        logger.memberLeave(member);
    }
}
module.exports = {
    GuildListener
};