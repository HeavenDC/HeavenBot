const { Listener, Events } = require('@sapphire/framework');
const logger = require('../../helpers/logger');
const { Colors, GuildMember, EmbedBuilder, VoiceState, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require('../../configs/config');

class GuildListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: Events.VoiceStateUpdate
        });
    }

    /**
     * 
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
    async run(oldState, newState) {
        if (oldState.channel === null && newState.channel !== null) {
            if (newState.channel.id === config.channels.autoVocal) {
                newState.guild.channels.create({
                    name: `Salon de ${newState.member.user.username}`,
                    type: ChannelType.GuildVoice,
                    parent: newState.channel.parent,
                    position: newState.guild.channels.fetch(config.channels.autoVocal).position + 1,
                    permissionOverwrites: [
                        {
                            id: newState.guild.roles.everyone.id,
                            allow: [
                                PermissionFlagsBits.Connect,
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.Speak
                            ]
                        },
                        {
                            id: newState.member.id,
                            allow: [
                                PermissionFlagsBits.Connect,
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.Speak
                            ]
                        }
                    ]
                }).then(async (channel) => {
                    await newState.member.voice.setChannel(channel);
                })
            }

            const embed = new EmbedBuilder({
                title: '🔉 HeavenLogs > Vocal',
                description: `**${newState.member.user.username}** vient de rejoindre un salon vocal.`,
                fields: [
                    {
                        name: 'Membre',
                        value: `<@${newState.member.id}>`,
                        inline: true
                    },
                    {
                        name: 'Salon vocal',
                        value: `${newState.channel}`,
                        inline: true
                    }
                ],
                footer: {
                    text: 'HeavenBot | All rights reserved',
                    iconURL: this.container.client.user.displayAvatarURL()
                },
                timestamp: new Date(),
                color: Colors.Green
            })

            const guild = await this.container.client.guilds.fetch(config.defaultGuildId[0])
            const channel = await guild.channels.fetch(config.channels.mainLogs)

            if (!guild || !channel) {
                throw new Error('Guild or channel not found')
            }

            channel.send({ embeds: [embed] })
        } else if (oldState.channel !== null && newState.channel === null) {
            if (oldState.channel.name.startsWith('Salon de')) {
                oldState.member.voice.disconnect()
                oldState.channel.delete()
            }

            const embed = new EmbedBuilder({
                title: '🔉 HeavenLogs > Vocal',
                description: `**${oldState.member.user.username}** vient de quitter un salon vocal.`,
                fields: [
                    {
                        name: 'Membre',
                        value: `<@${oldState.member.id}>`,
                        inline: true
                    },
                    {
                        name: 'Salon vocal',
                        value: `${oldState.channel}`,
                        inline: true
                    }
                ],
                footer: {
                    text: 'HeavenBot | All rights reserved',
                    iconURL: this.container.client.user.displayAvatarURL()
                },
                timestamp: new Date(),
                color: Colors.Green
            })

            const guild = await this.container.client.guilds.fetch(config.defaultGuildId[0])
            const channel = await guild.channels.fetch(config.channels.mainLogs)

            if (!guild || !channel) {
                throw new Error('Guild or channel not found')
            }

            channel.send({ embeds: [embed] })
        }
    }
}
module.exports = {
    GuildListener
};