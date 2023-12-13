import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";

 
import Dashboard from "./components/dashboard/Dashboard";
import SellerOptions from "./components/root/SellerOptions";
import ListOrders from "./orders/ListOrders";
import MyListProducts from "./my products/MyListProducts";
const HomeSeller = () => {
    return ( 
        <div className="app">
            <SellerOptions/>
           
        <Routes>
        <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<ListOrders />} />
          <Route path='/products' element={<MyListProducts />} />

        </Routes>
    
        </div>
     );
}
 
export default HomeSeller;