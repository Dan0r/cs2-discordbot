// Hallo-Welt-Funktion
const rush = (client) => {
	client.on("messageCreate", msg => {
		// In case the bot writes a text including "Rush", it wont prompt itself.
		if (msg.author.bot) return;
		
		if (msg.content === "Rush" || msg.content === "rush") {
			msg.reply("B!");
		}		
	});
}

// Exportiert die Funktion für index.js
module.exports = rush;
