const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
