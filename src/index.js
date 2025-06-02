// dotenv installieren, das die .env-Datei ausliest.
require("dotenv").config();
// discord.js installieren mit den Submodulen, die das Projekt benötigt.
const { Client, IntentsBitField } = require("discord.js");


// Horcht auf Nachrichten von Nutzern. 
const rush = require('./rush.js');
const moderation = require('./moderation.js');



// Intents spezifizieren
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

// Funktionen abfeuern
client.on("ready", () => {
	console.log(`Eingeloggt als ${client.user.tag}`);
	rush(client);
});

// Bot einloggen
client.login(process.env.BOT_TOKEN);



