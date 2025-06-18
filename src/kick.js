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
	async execute(interaction) {
		const nutzer = interaction.options.getMember("user");
		const grund = interaction.options.getString("reason");;
		
		// Kick starten.
		await interaction.deferReply();

		// Error-Handling
		try {
			// Administrator schreibt Nutzernamen in den Slash-Command, aber dieser existiert nicht.
			if (!nutzer) {
				return await interaction.editReply("Dieser Nutzer ist nicht auf dem Server.");
			}

			// Administrator schreibt seinen eigenen Nutzernamen in den Slash-Command.
			if (nutzer.id === interaction.guild.ownerId) {
				return await interaction.editReply("Du kannst den Serverbesitzer nicht kicken.");
			}
			
			/* 
				Wichtig: Im Discord-Server eine Rolle mit dem Administrator hinzufügen, mit der sie Mitglieder kicken kann.
				Prüfen, ob der zu kickende Nutzer eine ebenbürtige Rolle wie der Administrator hat. 
				Wenn Sie default_member_permissions entfernen, dann prüft es, wer eine höhere Rolle hat.
			*/
			const botPosition = interaction.guild.members.me.roles.highest.position;
			const submitterPosition = interaction.member.roles.highest.position;
			const nutzerPosition = nutzer.roles.highest.position;
		
			if (nutzerPosition >= submitterPosition) {
				return await interaction.editReply("Der Nutzer hat eine höhere oder gleichwertige Rolle wie du.");
			}

			if (nutzerPosition >= botPosition) {
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
			await nutzer.kick(grund);
			await interaction.editReply(`Der Administrator hat ${nutzer.user.tag} gekickt. Grund: ${reason}`);

		} catch (error) {
			console.error(error);
			await interaction.editReply("Beim Kicken des Nutzers ist ein Fehler aufgetreten.");
		}
	}
};
