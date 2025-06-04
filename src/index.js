// dotenv installieren, das die .env-Datei ausliest.
require("dotenv").config();
// discord.js installieren mit den Submodulen, die das Projekt benötigt.
const { Client, IntentsBitField, Collection } = require("discord.js");

// Horcht auf Nachrichten von Nutzern. 
const rush = require("./rush.js");
const willkommen = require("./willkommen.js");
const kick = require("./kick.js");


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
client.on("ready", async () => {
	console.log(`Eingeloggt als ${client.user.tag}`);
	rush(client);
	willkommen(client);
});

// Slash-Commands abspielen
client.commands = new Collection();
client.commands.set(kick.data.name, kick);

// Auf das Auslösen des Slash-Commands warten.
client.on("interactionCreate", async interaction => {
	const command = client.commands.get(interaction.commandName);
	if (!command) {
		console.warn(`Befehl ${interaction.commandName} nicht gefunden.`);
		return;
	}

	try {
		await command.kickexecute(interaction);
	} catch (error) {
		console.error(`Fehler bei Ausführung von ${interaction.commandName}:`, error);
		await interaction.reply({ content: "Ein Fehler ist aufgetreten.", ephemeral: true });
	}
});


// Bot einloggen
client.login(process.env.BOT_TOKEN);
