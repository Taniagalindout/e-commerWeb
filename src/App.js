import React from "react";
import Landing from "./components/landing/Landing";
import Login from "./modules/login/Login";
import Register from "./modules/login/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Switch from "react-switch";
import { useState } from "react";

import { useThemeContext } from "./context/ThemeContext";
function App() {
  const { contextTheme, setContextTheme } = useThemeContext();

  const [checked, setChecked] = useState(false);
  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
    console.log(nextChecked);
  };

  return (
    <div className="App" id={contextTheme} >
        <Switch
          onChange={handleSwitch}
          checked={checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
        <p>Darkmode</p>
        <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
