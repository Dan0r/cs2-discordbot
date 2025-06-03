// Hallo-Welt-Funktion
const rush = (client) => {
	client.on("messageCreate", msg => {
		// Sollte der Bot jemals selbst "Rush" schreiben, antwortet er nicht auf sich selbst.
		if (msg.author.bot) return;
		
		if (msg.content === "Rush" || msg.content === "rush") {
			msg.reply("B!");
		}		
	});
}

// Exportiert die Funktion für index.js
module.exports = rush;
