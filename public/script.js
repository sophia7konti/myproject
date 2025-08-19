const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMsg = document.getElementById('loginMsg');

const diaryDiv = document.getElementById('diaryDiv');
const loginDiv = document.getElementById('loginDiv');
const newEntryInput = document.getElementById('newEntry');
const addEntryBtn = document.getElementById('addEntryBtn');
const entriesList = document.getElementById('entriesList');

loginBtn.addEventListener('click', async () => {
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value
    })
  });
  const data = await res.json();
  if (data.success) {
    loginDiv.style.display = 'none';
    diaryDiv.style.display = 'block';
    loadEntries();
  } else {
    loginMsg.textContent = 'Λάθος username ή password';
  }
});

addEntryBtn.addEventListener('click', async () => {
  const entry = newEntryInput.value;
  if (!entry) return;
  await fetch('/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: entry, date: new Date().toLocaleString() })
  });
  newEntryInput.value = '';
  loadEntries();
});

async function loadEntries() {
  const res = await fetch('/entries');
  const entries = await res.json();
  entriesList.innerHTML = '';
  entries.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.date}: ${e.text}`;
    entriesList.appendChild(li);
  });
}
