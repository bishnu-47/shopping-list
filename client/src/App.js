import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

import Alerts from "./components/Alerts";

const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/register" element={<RegisterPage />} exact />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/" element={<Home />} exact />
      </Routes>

      <Alerts />
    </div>
  );
};

export default App;
