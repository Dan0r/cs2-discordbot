const { EmbedBuilder } = require("discord.js"); // Required import

const willkommen = async (client) => {
	client.on("guildMemberAdd", async member => {
		try {
			const channelID = process.env.CHANNEL_ID;
			const channel = member.guild.channels.cache.get(channelID);
			if (!channel) {
				console.error("Kanal-ID nicht gefunden ...");
				return;
			}

			const embed = new EmbedBuilder()
				.setTitle("Willkommen im CS2-Treff")
				.setURL("https://www.heise.de")
				.setDescription("Turniere finden jeden Freitag um 18:00 Uhr statt.")
				.setImage("https://heise.cloudimg.io/width/1008/q70.png-lossy-70.webp-lossy-70.foil1/_www-heise-de_/imgs/18/3/7/5/4/0/6/8/CS2-f3bbe059389edd94.png")
				.addFields(
						{
							name: "❗ Bitte lese dir die Server-Regeln durch:",
							value: "\u200B" // empty value to act like a heading
						},
						{
							name: "Regeln",
							value: [
								"• Schrei nicht ins Mikrofon.",
								"• Melde dich vor einem Turnier an.",
								"• Nicht mitten im Spiel AFK gehen."
							].join("\n")
						}
					)
				.setColor("Orange");

			await member.send({ embeds: [embed] });

		} catch (error) {
			console.error("Nachricht wurde nicht übermittelt ...", error);
		}
	});
};

module.exports = willkommen;
