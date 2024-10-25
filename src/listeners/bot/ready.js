const { Listener, Events } = require('@sapphire/framework');
const logger = require('../../helpers/logger');
const { Colors } = require('discord.js');

class ReadyListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: true,
            event: Events.ClientReady
        });
    }

    run(client) {
        const { username, id } = client.user;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    }
}
module.exports = {
    ReadyListener
};