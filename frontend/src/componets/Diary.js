import React, { useState, useEffect } from "react";

function Diary() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    fetch("/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const addEntry = async () => {
    if (!newEntry) return;
    const res = await fetch("/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newEntry, date: new Date().toISOString() }),
    });
    if (res.ok) {
      setEntries([...entries, { text: newEntry, date: new Date().toISOString() }]);
      setNewEntry("");
    }
  };

  return (
    <div>
      <h2>Οι Εγγραφές μου</h2>
      <ul>
        {entries.map((entry, i) => (
          <li key={i}>
            {entry.date}: {entry.text}
          </li>
        ))}
      </ul>
      <input
        placeholder="Νέα εγγραφή..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
      />
      <button onClick={addEntry}>Προσθήκη</button>
    </div>
  );
}

export default Diary;
