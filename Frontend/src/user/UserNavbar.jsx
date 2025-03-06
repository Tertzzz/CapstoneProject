import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  // Prevent Back Navigation After Logout
  useEffect(() => {
    if (showLogoutPopup) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }
  }, [showLogoutPopup]);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("userToken");
  
    // Prevent back navigation by replacing history
    navigate("/", { replace: true });
  
    // Completely block the back button
    setTimeout(() => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }, 0);
  
    // Reload to clear cached session data
    window.location.reload();
  };
  
  
  

  // ✅ Close popup when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("logout-popup")) {
      setShowLogoutPopup(false);
    }
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-container">
        {/* ✅ Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          Solo Parent Welfare
        </Link>

        {/* ✅ Hamburger Menu */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* ✅ Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
          <li><Link to="/track">Track</Link></li>
          <li className="logout-item">
            <button onClick={() => setShowLogoutPopup(true)}>Logout</button>
          </li>
        </ul>
      </div>

      {/* ✅ Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup show" onClick={handleClickOutside}>
          <div className="popup-content">
            <h3>Are you sure you want to log out?</h3>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleLogout}>Yes, Log Out</button>
              <button className="cancel" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
