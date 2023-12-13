import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";

 

import SellerOptionsAdmin from "./components/SellerOptionAdmin";
//tus rutas
import Dashboard from "./components/dashboard/Dashboard";
import ListOrders from "./orders/ListOrders";
import MyListProducts from "./my products/MyListProducts";
const HomeAdmin = () => {
    return ( 
        <div className="app">
            <SellerOptionsAdmin/>
           
        <Routes>
        <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<ListOrders />} />
          <Route path='/products' element={<MyListProducts />} />

        </Routes>
    
        </div>
     );
}
 
export default HomeAdmin;