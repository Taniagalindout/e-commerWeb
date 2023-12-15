import {
    BrowserRouter as Router,
    Routes,
    Route,
    
  } from "react-router-dom";

 
import Dashboard from "./components/dashboard/Dashboard";
// import SellerOptions from "./components/root/SellerOptions";
import SideBar from "../../components/generals/Siderbar";
import ListOrders from "./orders/ListOrders";
const HomeSeller = () => {
    return ( 
        <div className="app">
            <SideBar/>
           
        <Routes>
        <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<ListOrders />} />
        </Routes>
    
        </div>
     );
}
 
export default HomeSeller;