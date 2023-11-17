import React from 'react';
import Landing from './modules/products/product_list/ListProducts';
import DetailProduct from './modules/products/detail/DetailProduct';
import ListWishlist from './modules/products/wishlist/ListWishlist';
import NotFoundWishlist from './modules/products/wishlist/utilities/NotFoundWishlist';
import { BrowserRouter as Router,
   Switch,
   Route,
   Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/product-view/:id' component={DetailProduct}/>
        <Route exact path='/wishlist' component={ListWishlist}/>
        <Route exact path='/clean-wishlist' component={NotFoundWishlist}/>
      </Switch>
    </Router>


  );
}

export default App;


