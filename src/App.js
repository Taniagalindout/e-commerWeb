import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/globlal.css';
import HomeSeller from './modules/seller/HomeSeller';
import LostPassword from './modules/login/LostPassword';
import ChangePassword from './modules/login/ChangePassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/home-seller/*" element={<HomeSeller />} />
          <Route path="/lostpswd" element={<LostPassword />} />
          <Route path="/changepswd" element={<ChangePassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
