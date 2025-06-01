# Notizen
## Node Version Manager Install Node.js
    * A bash script that installs different versions of node and helps you install different versions. 
## Discord Install 
    * Install Desktop-Software
    * Create Server
    * Navigate to Discord (Developer Page)[https://discord.com/developers/applications]
    * Create Bot with Permissions:
        1. Check Intents: Mit diesen erkennt der Bots bestimmte Events, beispielsweise, dass ein Spieler dem Server beitritt.
        2. Paste Invite Link into browser and select server
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
