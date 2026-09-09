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

    const goToSection = (sectionId) => {
    closeMenu();

    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  // After navigating to Home, scroll to requested section
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1);

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

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
    <div className="header-overall-container">
          <header className="header-container container">
      <div className="header-inner">
        <a href="/" className="header-logo" onClick={closeMenu}>
          BIZOOP
        </a>
       <nav className="header-nav">
          <a
            href="/"
            className={
              location.pathname === "/" && !location.hash
                ? "header-nav-active"
                : ""
            }
          >
            Home
          </a>
          <a
            href="/our-products"
            className={
              location.pathname === "/our-products"
                ? "header-nav-active"
                : ""
            }
          >
            Products
          </a>
          <a
            href="/pricing"
            className={
              location.pathname === "/pricing"
                ? "header-nav-active"
                : ""
            }
          >
            Pricing
          </a>
        </nav>
        <div className="header-actions">
          <button className={`header-login-btn ${location.pathname === "/login" ? "header-login-active" : ""}`} onClick={()=> navigate('/login')}>
            Log in
          </button>
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
          <button className={`header-login-btn ${location.pathname === "/login" ? "header-login-active" : ""}`} 
          onClick={()=> navigate('/login')}>
            Log in
          </button>
          <button className="header-start-btn" onClick={()=> navigate('/login')}>
            Get started
          </button>
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;