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
import ChangePassword from './modules/login/ChangePassword';import ListProducts from './modules/products/product_list/ListProducts';
import DetailProduct from './modules/products/detail/DetailProduct';
import ListWishlist from './modules/products/wishlist/ListWishlist';
import NotFoundWishlist from './modules/products/wishlist/utilities/NotFoundWishlist';
import ShoppingCart from './modules/products/shopping_cart/ShoppingCart';
import NotFound from './modules/products/shopping_cart/utilities/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product-view' element={<ListProducts />} />
          <Route path='/product-view/:id' element={<DetailProduct />} />
          <Route path='/wishlist' element={<ListWishlist />} />
          <Route path='/clean-wishlist' element={<NotFoundWishlist />} />
          <Route path='/cart' element={<ShoppingCart/>} />
          <Route path='/clean-cart' element={<NotFound/>}/>
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
