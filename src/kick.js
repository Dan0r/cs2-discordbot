const { EmbedBuilder, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
	// Wie Discord den Slash-Command anzeigt.
	data: {
		default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
		name: "ciao",
		description: "Schmeißt Nutzer vom Server.",
		options: [
			{
				name: "user",
				description: "Der Nutzer, der gekickt werden soll.",
				type: ApplicationCommandOptionType.User, // Wählt die NutzerID aus.
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
	
	// Die Funktion des Slash-Commands
	async kickexecute(interaction) {
		const nutzer = interaction.options.getMember("user");
		const grund = interaction.options.getString("reason") || "Kein Grund angegeben";

		await interaction.deferReply({ ephemeral: true });

		try {
			if (!nutzer) {
				return await interaction.editReply("Dieser Nutzer ist nicht auf dem Server.");
			}

			if (nutzer.id === interaction.guild.ownerId) {
				return await interaction.editReply("Du kannst den Serverbesitzer nicht kicken.");
			}

			const botPosition = interaction.guild.members.me.roles.highest.position;
			const submitterPosition = interaction.member.roles.highest.position;
			const targetPosition = nutzer.roles.highest.position;

			if (targetPosition >= submitterPosition) {
				return await interaction.editReply("Der Nutzer hat eine höhere oder gleichwertige Rolle wie du.");
			}

			if (targetPosition >= botPosition) {
				return await interaction.editReply("Der Nutzer hat eine höhere oder gleichwertige Rolle wie ich.");
			}

			// Eingebettete Nachricht mitschicken 
			const kicknachricht = new EmbedBuilder()
				.setTitle("Du wurdest gekickt.")
				.addFields({ name: "Grund:", value: grund })
				.setColor("Orange");

			try {
				await nutzer.send({ embeds: [kicknachricht] });
			} catch (kickError) {
				console.warn("Konnte dem Nutzer keine DM senden:", kickError);
			}
			
			// Funktion ausführen
			await nutzer.kick(reason);
			await interaction.editReply(`Der Administrator hat ${nutzer.user.tag} gekickt. Grund: ${reason}`);

		} catch (error) {
			console.error(error);
			await interaction.editReply("Beim Kicken des Nutzers ist ein Fehler aufgetreten.");
		}
	}
};
