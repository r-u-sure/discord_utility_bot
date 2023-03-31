const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`${interaction.commandName} 커맨드를 찾을 수 없음`);
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }
};