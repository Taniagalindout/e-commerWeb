import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListUser from './modules/admin/users/ListUsers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/listusers' element={<ListUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
