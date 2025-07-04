## Discord Bot für JavaScript-Einsteiger 🤖
Ein Repository für einen [Artikel von heise online](https://www.heise.de/ratgeber/JavaScript-Einen-Discord-Bot-fuer-die-eigene-Gaming-Community-programmieren-10420597.html). Der Bot setzt auf JavaScript mit dem Framework discord.js. Er antwortet, spielt ein Willkommens-Banner aus und kickt Spieler.

## Installation
Sie klonen das Repository, navigiern zu diesem und installieren die Dependenzen mit npm von [Node.js](https://nodejs.org/en). 
```
git clone https://github.com/Dan0r/cs2-discordbot.git
cd cs2-discordbot
npm install
```
Erstellen Sie einen eignen Discord Server, mit den im Artikel beschriebenen Einstellungen. Danach erstellen Sie eine .env-Datei, die die Zugangsdaten abspeichert. Sie ist wie folgt strukturiert:
```
BOT_TOKEN=MTM38
GUILD_ID=1378408
CLIENT_ID=13784
CHANNEL_ID=13797
```
Registrieren Sie die Slash-Commands. Danach sollten Sie das Skript in dem Verzeichnis starten, in dem die .env-Datei liegt. Das Testen und Erweitern des Bots funktioniert am einfachsten mit dem Node.js-Werkzeug [nodemon](https://www.npmjs.com/package/nodemon).
```
node src/registrieren-slashcommands.js
nodemon
```
Ein Extra ist das Zusatzmodul hltv.js, das der Artikel auslässt. Es nutzt eine unoffizielle [API der Counterstrike-Nachrichten-Website HLTV.org](https://github.com/gigobyte/HLTV), um die zehn aktuellsten Artikel zu ziehen. Das Slash-Kommando dafür lautet `/hltv`. 


Viel Spaß beim Einstieg in JavaScript mit discord.js!


Stand: Juni 2025
