# Notizen
## Node Version Manager Install Node.js
    * A bash script that installs different versions of node and helps you install different versions. 
## Discord Install 
    * Install Desktop-Software
    * Create Server
    * Navigate to Discord (Developer Page)[https://discord.com/developers/applications]
    * Create Bot with Permissions:
        1. Check Intents: Mit diesen erkennt der Bots bestimmte Events, beispielsweise, dass ein Spieler dem Server beitritt.
        2. Create O2Auth: Bot and then Administrator 
        2. Paste O2Auth-Invite Link into browser and select server
    * For the application to recognise your bot, your userid, as well as the channel that the bot is supposed to supervise, you need IDs or Tokens which give your application access to these.
        1. Create .env file in the /src directory (or main directory if using nodemon)
        2. Structure it like this:
```
TOKEN=M23AWOP(.dev/Bot/Reset Token/Danach kann man es einmalig kopieren)
GUILD_ID=12318813 (Rechtsklick auf das Server-Icon)
CLIENT_ID=1378410021624217734 
CHANNEL_ID=1378408958485729314 (Einstellungen/Erweitert/Entwicklermodus/Rechtsclick auf 'Text channels' und dann 'Kanal ID kopieren'
```

## Hello-World
index.js is the main script which executes the functions which we put in differnt modules.
One of these modules is a simple script, which responds to user input, the script rush.js is in the same directory /src
1. Bot einloggen
Bibliotheken importieren    
```
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
```
Module importieren, die wir selber geschrieben haben
```
const rush = require ('./rush')
```
The Client class is used to create a bot instance and manage its connection to the Discord API. It also provides methods for interacting with servers, users, messages, and other Discord features."

Wie fur eine Webanwendung horchen wir mit JavaScript auf Events, etwa, ob ein Nutzer eine Nachricht in den Chat schreibt. Discord definiert diese Events vor. Wir mussen beim Instantieren des Client nur noch einen Array an Optionen eingeben, auf welche Events der Klient horchen soll. 
https://discord.js.org/docs/packages/discord.js/14.19.3/Client:Class#options

Das funktioniert mit der Klasse Intentsbitfield, deren Eigenschaft Flags speichert, welche Events der Client von der Discord-API empfangen soll.
```
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});
```

Die on.-Methode der Klasse Client horcht auf Events. Sobald der Bot sich erfolgreich mit Discord verbindet, lost das "ready" Event aus. Daraufhin lost eine Funktion aus, die Hallo-Welt in die Konsole schreibt.
Danach können wir den Bot mit dieser Programmierung einloggen. The discord.js library uses the TOKEN to authenticate your bot by connecting to Discord’s Gateway (their WebSocket server).

```
// Im /src-Verzeichnis ausführen. In diesem muss auch die .env-Datei liegen.
node index.js

// In jeglichem Verzeichnis auführbar, weil nodemon das Verzeichnis durch den Schlussel "main" in package.json findet.
nodemon
```
Wir können auch den Bot-Namen cs2bot#4359 ausgeben mit einem Template Literal:
```
client.on("ready", () => {
	console.log(`Eingeloggt als ${client.user.tag}`);
});
```
## Auf Chat-Nachrichten reagieren
Als nächstes lauschen wir auf eine Nachricht die jeglicher Nutzer in den Channel schreibt. 

```
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
```
Die Funktion `rush` trägt den Parameter `client`, damit wir spater in index.js das client objekt als Parameter der Funktion übergeben können.
DIe Funktion lauscht, ob ein Nutzer in dem Server eine Nachricht erstellt hat. Wenn das messageCreate-Event da ist, gibt es ein Message-Objekt aus. Das speichern wir in der Variable msg. Die Varible hält dann den Namen des Verfassers (username), wann die Nachricht versand wurde (timestamp) oder den Inhalt (content).
Wenn die Eigenschaft .content also Rush oder rush ist, dann antwortet der Bot mit "B!"
In Node.js ist jedes Skript ein Modul, und mit module.exports konnen andere Skripte auf dieselbe function zugreifen. In JavaScript exportiert man Funktionen mit module.exports, damit kann das Hauptskript auf das Modul zugreifen.

## Welcome Message
EmbedBuilder Explanation

Channge Kanal_ID to Channel_IDj


https://discord.gg/6BtShRP8



## Slash-Commands nutzen
Als Administrator möchte man nicht direkt in den Chat tippen, um seinen Channel zu moderieren.
Mit Slash Command konnen Sie direkt mit dem Bot kommunizieren: Nachdem man ein / tipp sendet man ein direktes Kommando an den Bot, etwa /kick, um einen Spieler vom Server zu schmeissen.


Ein Administrator muss die Slash-Command erst beim Bot registrieren.
https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files


// discord.js-Dokumentation: "slash commands need to be registered only once"


In einem Array definieren Sie die Slash-Commands. Die jeweiligen Schlüssel finden Sie in der discord.js-Dokumentation. Beim Schlüssel name muss der Wert immer Kleinbuchstaben geschrieben werden, sodass es in diesem Beispiel diesen Befehl ergibt: /test. Dieser Befehl dient aber erst als Beispiel, um Ihnen die Registrierung zu zeigen.
Die Registrierung übernimmt das REST-Modul von discord.js. Mit dem können Sie Anfragen an die Programmierschnittstelle stellen.
Dafür instanziieren Sie das Rest-Objekt für Ihren Bot. Denn das erlaubt die .put()-Methode zu verwenden, die wie der Name schon sagt eine HTTP-PUT-Anfrage erstellt. Das heißt: Die API soll ein Datenpunkt aktualisieren. In diesem Fall ist das die gesamte Liste an Slash-Commands.
Sie müssen der .put()-Methode noch mitteilen, wo die Daten aktualsiert werden sollen. Das erledigt die applicationGuildCommands()-Methode von Routes, das eine URL zum Channel des Servers erstellt. Danach senden Sie die Anfrage.
Die Methode applicationGuildCommands() des Objekts Routes hilft dabei die korrekte URL zu erstellen, an die die Abfrage gesendet wird. Der discord.js verweist darauf, dass Sie die Slash commands als body senden sollten

Slash commands kann man einmalig registrieren. Das hilft der Leistung des Bots


## Kick

https://discord.com/developers/docs/topics/permissions

Sagt der Discord-API, dass nur Administratoren die Rechte für diesen Slash-Command haben: Die Discord-API nimmt den Code als String an, deswegen konvertiert die methode toString() das Bitfield der Eigenschaft KickMembers zu 2.
https://discord.com/developers/docs/interactions/application-commands

Diesesmal horcht der Bot nicht auf das "ready"-Event, sondern auf eine "interaction": Ob der Nutzer etwa einen Slash-Comand auslöst.
Daraufhin empfängt der Bot ein Interaction-Objekt von der Discord-API.
Die wird ein 


