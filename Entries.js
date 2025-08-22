import React, { useState, useEffect } from 'react';

function Entries() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  const fetchEntries = async () => {
    const res = await fetch('/entries');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAdd = async () => {
    if (!text) return;
    const res = await fetch('/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, date: new Date().toLocaleString() }),
    });
    const data = await res.json();
    if (data.success) {
      setText('');
      fetchEntries();
    }
  };

  return (
    <div>
      <h2>My Entries</h2>
      <input
        type="text"
        placeholder="New entry..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {entries.map((e, idx) => (
          <li key={idx}>{e.date}: {e.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Entries;
