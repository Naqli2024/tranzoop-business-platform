import React, { useState, useContext, useEffect } from "react";
import "../assets/styles/header.css";
import { ThemeContext } from "../helpers/ThemeContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const closeMenu = () => setMenuOpen(false);

  const goToSection = (sectionId) => {
    closeMenu();

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);

      if (element) {
        const headerOffset = 110;

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth",
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(sectionId);

        if (element) {
          const headerOffset = 110;

          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const ThemeToggle = () => (
    <div className="dark-light-theme-toggle">
      <button
        type="button"
        className={`dark-light-theme-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => {
          if (theme !== "dark") {
            toggleTheme();
          }
        }}
        aria-label="Switch to dark theme"
      >
        <MdOutlineDarkMode />
      </button>

      <button
        type="button"
        className={`dark-light-theme-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => {
          if (theme !== "light") {
            toggleTheme();
          }
        }}
        aria-label="Switch to light theme"
      >
        <MdOutlineLightMode />
      </button>
    </div>
  );
  
  const goHome = () => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="header-overall-container">
      <header className="header-container container">
        <div className="header-inner">
          <button type="button" className="header-logo" onClick={goHome}>
            BIZOOP
          </button>
          <nav className="header-nav">
            <button
              type="button"
              className={
                location.pathname === "/" && !location.hash
                  ? "header-nav-active"
                  : ""
              }
              onClick={goHome}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => goToSection("vision")}
              className={
                location.pathname === "/" && location.hash === "#vision"
                  ? "header-nav-active"
                  : ""
              }
            >
              Vision
            </button>

            <button
              type="button"
              className={
                location.pathname === "/our-products" ? "header-nav-active" : ""
              }
              onClick={() => {
                closeMenu();
                navigate("/our-products");
              }}
            >
              Products
            </button>

            <button
              type="button"
              className={
                location.pathname === "/pricing" ? "header-nav-active" : ""
              }
              onClick={() => {
                closeMenu();
                navigate("/pricing");
              }}
            >
              Pricing
            </button>

            <button
              type="button"
              onClick={() => goToSection("faq")}
              className={
                location.pathname === "/" && location.hash === "#faq"
                  ? "header-nav-active"
                  : ""
              }
            >
              FAQ
            </button>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className={`header-login-btn ${
                location.pathname === "/login" ? "header-login-active" : ""
              }`}
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              Log in
            </button>

            <ThemeToggle />

            <button
              type="button"
              className="header-start-btn"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              Get started
            </button>
          </div>
          <button
            type="button"
            className={`header-menu-btn ${
              menuOpen ? "header-menu-btn-active" : ""
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
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
          className={`header-mobile-menu ${
            menuOpen ? "header-mobile-menu-open" : ""
          }`}
        >
          <div className="header-mobile-theme-row">
            <ThemeToggle />
          </div>

          <nav className="header-mobile-nav">
            <button type="button" onClick={goHome}>
              Home
            </button>

            <button type="button" onClick={() => goToSection("vision")}>
              Vision
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                navigate("/our-products");
              }}
            >
              Products
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                navigate("/pricing");
              }}
            >
              Pricing
            </button>

            <button type="button" onClick={() => goToSection("faq")}>
              FAQ
            </button>
          </nav>

          <div className="header-mobile-actions">
            <button
              type="button"
              className={`header-login-btn ${
                location.pathname === "/login" ? "header-login-active" : ""
              }`}
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              Log in
            </button>

            <button
              type="button"
              className="header-start-btn"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              Get started
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
