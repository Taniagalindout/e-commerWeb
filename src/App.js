import React from 'react';
import Landing from './components/landing/Landing';
import Login from './modules/login/Login';
import Register from './modules/login/Register';
import './assets/css/globlal.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import HomeSeller from './modules/seller/HomeSeller';
import ListOrders from './modules/seller/orders/ListOrders';
function App() {

  return (
    <div className="App ">

      <Router>
        <Routes> 
          <Route  path='/' element={<Landing />} />
          <Route  path='/login' element={<Login />} />
          <Route  path='/register' element={<Register />} />
          <Route path="/home-seller/*" element={<HomeSeller />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
