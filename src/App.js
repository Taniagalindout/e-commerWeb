import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/landing' element={<Landing />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
