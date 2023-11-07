import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Landing></Landing> */}
        <Login/>
      </header>
    </div>
  );
}

export default App;

