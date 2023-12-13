import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SellerOptionsAdmin from "./components/SellerOptionAdmin";
import ListUsers from "./users/ListUsers";
import DashboardGeneral from "./dashboard-general/DashboardGeneral";
import ListSeller from "./sellers/ListSeller";

const HomeAdmin = () => {
  return (
    <div className="app">
      <SellerOptionsAdmin />
      <Routes>
        <Route path="/" element={<ListUsers />} />
        <Route path="/dashgral" element={<DashboardGeneral />} />
        <Route path="/listsellers" element={<ListSeller />} />
      </Routes>
    </div>
  );
};

export default HomeAdmin;
