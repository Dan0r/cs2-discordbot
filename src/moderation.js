const { SlashCommandBuilder } = require('discord.js');

const moderation = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};

module.exports = moderation;
