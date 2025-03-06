import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const scrollToContacts = (e) => {
    e.preventDefault();
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ Logo */}
        <Link to="/" className="navbar-logo">
          Solo Parent Welfare
        </Link>

        {/* ✅ Hamburger Button */}
        <button 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        {/* ✅ Navigation Menu */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
          <li><Link to="/" className="nav-link" onClick={scrollToTop}>Home</Link></li>
          <li><Link to="/about" className="nav-link" onClick={scrollToAbout}>About</Link></li>
          <li><Link to="/Contacts" className="nav-link" onClick={scrollToContacts}>Contacts</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
