// backend/testBackend.js
const http = require("http");

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/login", // ή οποιοδήποτε endpoint υπάρχει στο backend σου
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (e) => {
  console.error("Error connecting to backend:", e.message);
});

req.write(JSON.stringify({ username: "admin", password: "1234" }));
req.end();
