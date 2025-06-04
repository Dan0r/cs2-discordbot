const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: {
		name: "kick",
		description: "Kicks a user",
		options: [
			{
				name: "user",
				description: "The user to be kicked",
				type: ApplicationCommandOptionType.Mentionable,
				required: true,
			},
			{
				name: "reason",
				description: "The reason for the kick",
				type: ApplicationCommandOptionType.String,
				required: false,
			},
		],
		default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
	},
	// this is the actual logic
	async execute(interaction) {
		const targetUserId = interaction.options.get("user").value;
		const reason = interaction.options.get("reason")?.value || "No reason provided";

		await interaction.deferReply({ ephemeral: true });

		try {
			const targetUser = await interaction.guild.members.fetch(targetUserId);

			if (!targetUser) {
				return await interaction.editReply("That user doesn't exist.");
			}

			if (targetUser.id === interaction.guild.ownerId) {
				return await interaction.editReply("You cannot kick the server owner.");
			}

			const botPosition = interaction.guild.members.me.roles.highest.position;
			const submitterPosition = interaction.member.roles.highest.position;
			const targetPosition = targetUser.roles.highest.position;

			if (targetPosition >= submitterPosition) {
				return await interaction.editReply("That user has a higher or equal role than you.");
			}

			if (targetPosition >= botPosition) {
				return await interaction.editReply("That user has a higher or equal role than me.");
			}

			await targetUser.kick(reason);
			await interaction.editReply(`Kicked ${targetUser.user.tag}. Reason: ${reason}`);
		} catch (error) {
			console.error(error);
			await interaction.editReply("An error occurred while trying to kick the user.");
		}
	}
};
