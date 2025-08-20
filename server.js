<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Στατικό username/password
const USER = { username: 'admin', password: '1234' };

app.use(bodyParser.json());
app.use(express.static('public'));

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
  const entries = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'entries.json'), 'utf8'));
  res.json(entries);
});

// Add entry
app.post('/entries', (req, res) => {
  const newEntry = req.body;
  const filePath = path.join(__dirname, 'data', 'entries.json');
  const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  entries.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  res.json({ success: true });
});

// Αυτόματη επιλογή ελεύθερης θύρας
const DEFAULT_PORT = 3000;
const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on http://localhost:${DEFAULT_PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${DEFAULT_PORT} is in use, trying another port...`);
    const randomPort = Math.floor(Math.random() * (4000 - 3001 + 1)) + 3001; // 3001-4000
    server.listen(randomPort, () => {
      console.log(`Server running on http://localhost:${randomPort}`);
    });
  } else {
    console.error(err);
  }
});
=======
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Στατικό username/password
const USER = { username: 'admin', password: '1234' };

app.use(bodyParser.json());
app.use(express.static('public'));

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
  const entries = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'entries.json'), 'utf8'));
  res.json(entries);
});

// Add entry
app.post('/entries', (req, res) => {
  const newEntry = req.body;
  const filePath = path.join(__dirname, 'data', 'entries.json');
  const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  entries.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  res.json({ success: true });
});

// Αυτόματη επιλογή ελεύθερης θύρας
const DEFAULT_PORT = 3000;
const server = app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on http://localhost:${DEFAULT_PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${DEFAULT_PORT} is in use, trying another port...`);
    const randomPort = Math.floor(Math.random() * (4000 - 3001 + 1)) + 3001; // 3001-4000
    server.listen(randomPort, () => {
      console.log(`Server running on http://localhost:${randomPort}`);
    });
  } else {
    console.error(err);
  }
});
>>>>>>> 3a184adea379433081ea6c46ba29511bf30b6153
