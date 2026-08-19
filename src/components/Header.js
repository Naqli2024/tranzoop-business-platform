import React, { useState, useContext, useEffect } from "react";
import "../assets/styles/header.css";
import { ThemeContext } from "../helpers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const ThemeToggle = () => (
    <div className="dark-light-theme-toggle">
      <div
        className={`dark-light-theme-btn ${theme === "dark" ? "active" : ""}`}
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        aria-label="Switch to dark theme"
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleTheme()}
      >
        <MdOutlineDarkMode />
      </div>
      <div
        className={`dark-light-theme-btn ${theme === "light" ? "active" : ""}`}
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        aria-label="Switch to light theme"
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleTheme()}
      >
        <MdOutlineLightMode />
      </div>
    </div>
  );

  return (
    <header className="header-container container">
      <div className="header-inner">
        <a href="/" className="header-logo" onClick={closeMenu}>
          TRANZOOP
        </a>
        <nav className="header-nav">
          <a onClick={()=> navigate('/')} className={location.pathname === "/" ? "header-nav-active" : ""}>Home</a>
          <a href="#services">Service Booking</a>
          <a onClick={()=> navigate('/products')} className={location.pathname === "/products" ? "header-nav-active" : ""}>BOS</a>
          <a href="#how-it-works">How it works</a>
          <a href="#services">For providers</a>
        </nav>
        <div className="header-actions">
          {/* <button className={`header-login-btn ${location.pathname === "/login" ? "header-login-active" : ""}`} onClick={()=> navigate('/login')}>
            Log in
          </button> */}
          <ThemeToggle />
          <button className="header-start-btn" onClick={()=> navigate('/login')}>
            Get started
          </button>
        </div>
        <button
          className={`header-menu-btn ${menuOpen ? "header-menu-btn-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="header-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        id="header-mobile-menu"
        className={`header-mobile-menu ${menuOpen ? "header-mobile-menu-open" : ""}`}
      >
        <div className="header-mobile-theme-row">
          <ThemeToggle />
        </div>
        <nav className="header-mobile-nav">
          <a href="#services" onClick={closeMenu}>
            Service Booking
          </a>
          <a href="#bos" onClick={closeMenu}>
            BOS
          </a>
          <a href="#how-it-works" onClick={closeMenu}>
            How it works
          </a>
          <a href="#providers" onClick={closeMenu}>
            For providers
          </a>
        </nav>
        <div className="header-mobile-actions">
          {/* <button className={`header-login-btn ${location.pathname === "/login" ? "header-login-active" : ""}`} 
          onClick={()=> navigate('/login')}>
            Log in
          </button> */}
          <button className="header-start-btn" onClick={()=> navigate('/login')}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;