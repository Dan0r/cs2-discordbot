const { HLTV } = require("hltv");
const { EmbedBuilder } = require("discord.js");

// Format current date 
const date = new Date().toISOString().slice(0, 10);

module.exports = {
	data: {
		name: "hltvnews",
		description: "Fetches the last 10 articles published."
	}, 
	async execute(interaction) { 
		await interaction.deferReply();

		try {
			/* 
			Daten von der "Unofficial HLTV-API" fetchen.
			getNews() ist eine Methode der HLTV-Bibliothek.
			*/
			const data = await HLTV.getNews();
			// Array erstellen, das die Embedded-Nachrichten speichern wird. 
			const newsArticles= [];
			/* 
			Array befüttern mit Embedded-Nachrichten.
			Die enthalten jeweils den Titel und den Link des Nachrichten-Objekts.
			*/ 
			for (let i = 0; i < 10; i++) {
				// Das Nachricht-Objekt für die jetzige Schleife speichern. 
				const news = data[i];

				// Embedded-Nachricht mit dem Artikel füllen.
				const article = new EmbedBuilder()
					.setTitle(news.title)
					.setURL(`https://www.hltv.org${news.link}`)
					.setColor("Orange");

				// Pro Schleife, die im Array gespeicherten Nachrichten schicken. 
				newsArticles.push(article);
			};

			try {
				await interaction.user.send({ embeds: newsArticles });
				await interaction.editReply("Die zehn neusten Artikel von HLTV.org wurden versandt.");
			} catch (messageError) {
				console.warn("Konnte dem Nutzer keine DM senden:", messageError);
				await interaction.editReply("Es konnte keine DM versandt werden.");
			}

		} catch (error) {
			console.error("The fetch failed", error);
			return null;
		}
	}
};
