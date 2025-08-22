import React, { useState } from 'react';
import Login from './components/Login';
import Entries from './components/Entries';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? <Entries /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
