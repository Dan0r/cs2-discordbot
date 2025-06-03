// Nötige Module importieren.
require("dotenv").config();
const { REST, Routes } = require("discord.js");

// Slash-Command definieren.
// Discord erlaubt nur Kleinbuchstaben!
const commands = [
	{
		name: "test",
		description: "testet die Registrierung des Slash-Commands",
	},
];

// Instanz des REST-Moduls starten für den Bot mit dem jeweiligen Token. 
const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);


// Slash-Commands deployen (englisch für "einsetzen").
const asyncfunction = async () => {
	try {
		console.log("Slash commands sind am registrieren ...")
		// Slash-Commmands für den jeweiligen Server posten. 
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID
			),
			// Hält die Slash-Commands, die gepostet werden sollen. 
			{ body: commands }
		);

		console.log("Slash commands sind registriert.");

	} catch (error) {
		console.log(`Registrierung abgebrochen: ${error}`);
	}
}

// Die Funktion einmalig aufrufen || Als Funktion mit module.exports exportieren und in index.js importieren.
asyncfunction()
