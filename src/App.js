import React from 'react';
import Landing from './modules/products/product_list/ListProducts';
import DetailProduct from './modules/products/detail/DetailProduct';
import ShoppingCart from './modules/products/shopping_cart/ShoppingCart';
import NotFound from './modules/products/shopping_cart/utilities/NotFound';
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
        <Route exact path='/cart' component={ShoppingCart} />
        <Route exact path='/clean-cart' component={NotFound}/>
      </Switch>
    </Router>


  );
}

export default App;


