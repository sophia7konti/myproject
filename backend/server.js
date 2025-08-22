const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Χρήση middleware
app.use(bodyParser.json());
app.use(cors());

// Στατικό username/password
const USER = { username: 'admin', password: '1234' };

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Get entries
app.get('/entries', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'entries.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(entries);
});

// Add entry
app.post('/entries', (req, res) => {
  const newEntry = req.body;
  const filePath = path.join(__dirname, 'data', 'entries.json');
  const entries = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : [];
  entries.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  res.json({ success: true });
});

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Αυτόματη επιλογή port
const DEFAULT_PORT = 5000;
const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on http://localhost:${DEFAULT_PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const randomPort = Math.floor(Math.random() * (6000 - 5001 + 1)) + 5001; // 5001-6000
    server.listen(randomPort, () => {
      console.log(`Port in use. Server running on http://localhost:${randomPort}`);
    });
  } else {
    console.error(err);
  }
});
