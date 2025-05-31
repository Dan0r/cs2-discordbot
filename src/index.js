// dotenv installieren, das die .env-Datei ausliest.
require("dotenv").config();
// discord.js installieren mit den Submodulen, die das Projekt benötigt.
const { Client, IntentsBitField } = require("discord.js");


// Selbstprogrammierte Module laden.
const rush = require("/.rush");

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
	console.log('Hallo Welt');
});

// Bot einloggen
client.login(process.env.TOKEN);


