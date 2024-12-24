const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors'); // CORS hinzufügen

const app = express();
app.use(cors()); // CORS-Middleware verwenden
app.use(bodyParser.urlencoded({ extended: true }));

// Statische Dateien aus dem "public"-Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

const token = '7983061576:AaAGKBvY5MxCTHnlgpgRZ97sBMqMfV1bVFAg';
const chatId = '1460847056';
const bot = new TelegramBot(token, { polling: true });

app.get('/test', (req, res) => {
    res.send('Server ist erreichbar');
});

app.post('/submit', (req, res) => {
    const answers = req.body;
    console.log('Empfangene Antworten:', answers); // Log hinzugefügt
    const message = `Antworten erhalten:\nFrage 1: ${answers.question1}\nFrage 2: ${answers.question2}`;
    
    bot.sendMessage(chatId, message)
        .then(() => res.send('Antworten gesendet!'))
        .catch(error => {
            console.error(error);
            res.status(500).send('Fehler beim Senden der Antworten');
        });
});

const PORT = 4000; // Port sicherstellen
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
