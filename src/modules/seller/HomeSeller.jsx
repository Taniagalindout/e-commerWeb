import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import PieChart from "./components/chart/PieChart";
import Dashboard from "./components/dashboard/Dashboard";
import SellerOptions from "./components/root/SellerOptions";
const HomeSeller = () => {
    return ( 
        <div className="app">
            <SellerOptions/>
            
            <Switch>
            <Route path="/home-seller/dashboard" component={Dashboard} /> 
            </Switch>
            
         
           
        </div>
     );
}
 
export default HomeSeller;