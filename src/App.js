import React from 'react';
import Landing from './modules/products/product_list/ListProducts';
import DetailProduct from './modules/products/detail/DetailProduct';
import { BrowserRouter as Router,
   Switch,
   Route,
   Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/product-view' component={DetailProduct}/>
      </Switch>
    </Router>


  );
}

export default App;


