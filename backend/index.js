const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE)');
  db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, username TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');
});

// Endpoints
app.post('/login', (req, res) => {
  const { username } = req.body;
  db.run('INSERT OR IGNORE INTO users (username) VALUES (?)', [username], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send({ success: true });
  });
});

app.post('/send', (req, res) => {
  const { username, message } = req.body;
  db.run('INSERT INTO messages (username, message) VALUES (?, ?)', [username, message], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send({ success: true });
  });
});

app.get('/messages', (req, res) => {
  db.all('SELECT username, message, timestamp FROM messages ORDER BY timestamp ASC', [], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    res.send(rows);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
