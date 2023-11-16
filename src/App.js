import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import ImagesFirebase from './modules/images/Images';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/landing' element={<Landing />} />
          <Route path='/' element={<Login />} />
          <Route path='/images' element={<ImagesFirebase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
