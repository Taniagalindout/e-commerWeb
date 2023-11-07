import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Landing></Landing> */}
        {/* <Login/> */}
        <Register/>
      </header>
    </div>
  );
}

export default App;

