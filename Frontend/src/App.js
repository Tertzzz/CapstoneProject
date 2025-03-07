import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./mainpage/MainPage";
import Login from "./login/Login";
import Signup from "./login/Signup";
import AdminDashboard from "./admin/AdminDashboard";
import Userui from "./user/Userui";
import MultiStepForm from "./user/MultiStepForm";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const hideNavbar = ["/admin-dashboard","/userui","/login","/signup", "/form"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/userui" element={<Userui />} />
        <Route path="/form" element={<MultiStepForm />} />
      </Routes>
    </>
  );
};

export default App;
