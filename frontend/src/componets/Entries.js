import React, { useEffect, useState } from 'react';

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  const fetchEntries = async () => {
    const res = await fetch('/entries');
    const data = await res.json();
    setEntries(data);
  };

  const addEntry = async () => {
    await fetch('/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    fetchEntries();
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <div>
      <ul>
        {entries.map((e, i) => <li key={i}>{e.text}</li>)}
      </ul>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addEntry}>Add Entry</button>
    </div>
  );
}
