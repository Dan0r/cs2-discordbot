const { EmbedBuilder, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: {
		default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
		name: "ciao",
		description: "Schmeißt Nutzer vom Server.",
		options: [
			{
				name: "user",
				description: "Der Nutzer, der gekickt werden soll.",
				type: ApplicationCommandOptionType.User,
				required: true,
			},
			{
				name: "reason",
				description: "Grund für den Kick.",
				type: ApplicationCommandOptionType.String, // Setzt eine Nachricht bei, die Sie bei 'reason' nutzen.
				required: false,
			},
		],
	},

	async execute(interaction) {
		const targetUser = interaction.options.getMember("user");
		const reason = interaction.options.getString("reason") || "Kein Grund angegeben";

		await interaction.deferReply({ ephemeral: true });

		try {
			if (!targetUser) {
				return await interaction.editReply("Dieser Nutzer ist nicht auf dem Server.");
			}

			if (targetUser.id === interaction.guild.ownerId) {
				return await interaction.editReply("Du kannst den Serverbesitzer nicht kicken.");
			}

			const botPosition = interaction.guild.members.me.roles.highest.position;
			const submitterPosition = interaction.member.roles.highest.position;
			const targetPosition = targetUser.roles.highest.position;

			if (targetPosition >= submitterPosition) {
				return await interaction.editReply("Der Nutzer hat eine höhere oder gleichwertige Rolle wie du.");
			}

			if (targetPosition >= botPosition) {
				return await interaction.editReply("Der Nutzer hat eine höhere oder gleichwertige Rolle wie ich.");
			}

			// Eingebettete Nachricht mitschicken 
			const kicknachricht = new EmbedBuilder()
				.setTitle("Du wurdest gekickt.")
				.addFields({ name: "Grund:", value: reason })
				.setColor("Orange");

			try {
				await targetUser.send({ embeds: [kicknachricht] });
			} catch (dmError) {
				console.warn("Konnte dem Nutzer keine DM senden:", dmError);
			}
			


			// Funktion ausführen
			await targetUser.kick(reason);
			await interaction.editReply(`Der Administrator hat ${targetUser.user.tag} gekickt. Grund: ${reason}`);

		} catch (error) {
			console.error(error);
			await interaction.editReply("Beim Kicken des Nutzers ist ein Fehler aufgetreten.");
		}
	}
};
