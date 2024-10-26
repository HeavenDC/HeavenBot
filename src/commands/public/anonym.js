const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');
const { CommandInteraction, EmbedBuilder, Colors } = require('discord.js');
const config = require('../../configs/config');
const logger = require('../../helpers/logger');

class PublicCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('anonym').setDescription('Permet d\'envoyer un message anonyme').addStringOption((option) =>
                option.setName('message').setDescription('Le message à envoyer').setRequired(true)
            )
        );
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async chatInputRun(interaction) {
        if (interaction.channel.id !== config.channels.anonym) {
            return interaction.reply({
                content: `:x: Cette commande ne peut être utilisée que dans <#${config.channels.anonym}>.`,
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder({
            title: 'Message anonyme',
            description: interaction.options.getString('message'),
            color: Colors.DarkButNotBlack,
            footer: {
                text: 'HeavenBot | All rights reserved',
                iconURL: this.container.client.user.displayAvatarURL()
            },
            timestamp: new Date()
        })

        const mentions = interaction.options.getString('message').match(/<@!?\d+>/g);

        const channel = await this.container.client.guilds.fetch(config.defaultGuildId[0]).then(guild => guild.channels.fetch(config.channels.anonymLogs))
        const messageLink = `[Voir le message](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id})`
        const logEmbed = new EmbedBuilder({
            title: '🔒 HeavenLogs > Anonymes',
            description: `Un message anonyme a été envoyé par <@${interaction.user.id}>`,
            fields: [
                {
                    name: 'Message',
                    value: `\`\`${interaction.options.getString('message')}\`\``,
                    inline: false
                },
                {
                    name: 'Lien du message',
                    value: messageLink,
                    inline: false
                }
            ],
            footer: {
                text: 'HeavenBot | All rights reserved',
                iconURL: this.container.client.user.displayAvatarURL()
            },
            timestamp: new Date(),
            color: Colors.DarkButNotBlack
        })

        await channel.send({ embeds: [logEmbed] })

        await interaction.channel.send({
            content: mentions ? mentions.join(' ') : '',
            embeds: [embed]
        })

        await interaction.reply({ content: 'Message envoyé avec succès !', ephemeral: true });
    }
}
module.exports = {
    PublicCommand
};