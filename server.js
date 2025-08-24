const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

// Στατικό username/password
const USER = { username: 'admin', password: '1234' };

// Μυστικό κλειδί JWT (ιδανικά βάλε το σε .env)
const JWT_SECRET = "super_secret_key";

app.use(bodyParser.json());
app.use(express.static('public'));

// ---------------- AUTH ----------------

// Login endpoint -> επιστρέφει JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // ισχύει για 1 ώρα
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Middleware για έλεγχο JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Περιμένουμε "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // περνάμε τα στοιχεία του χρήστη στο request
    next();
  });
}

// ---------------- ENTRIES ----------------

// Get entries (protected)
app.get('/entries', authenticateToken, async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'entries.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Could not read entries' });
  }
});

// Add entry (protected)
app.post('/entries', authenticateToken, async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'entries.json');
    const data = await fs.readFile(filePath, 'utf8');
    const entries = JSON.parse(data);
    entries.push({ ...req.body, user: req.user.username, date: new Date() });
    await fs.writeFile(filePath, JSON.stringify(entries, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not save entry' });
  }
});

// ---------------- SERVER ----------------

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(3000);
