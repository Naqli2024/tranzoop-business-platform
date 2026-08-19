import React from "react";
import "../../assets/styles/landingPage.css";
import { useNavigate } from "react-router-dom";

const FooterSection = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="footer-section">
      <section className="footer-cta container">
        <div className="footer-cta-container">
          <h2 className="footer-cta-title">
            Ready to move your business forward?
          </h2>

          <p className="footer-cta-description">
            Whether you're booking a service or running your business, Tranzoop
            gives you one platform to manage, operate and grow.
          </p>

          <div className="footer-cta-actions">
            <button
              className="footer-primary-btn"
              onClick={() => {
                window.location.href = "#services";
              }}
            >
              Book a Service
              <span>↗</span>
            </button>

            <button
              className="footer-secondary-btn"
              onClick={() => navigate('/products')}
            >
              Explore BOS
              <span>↗</span>
            </button>
          </div>
        </div>
      </section>
      <div className="footer-main">
        <div className="footer-container container">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              TRANZOOP
            </a>
            <p className="footer-description">
              The marketplace and operating system for modern businesses —
              booking services, managing operations and growing your business in
              one platform.
            </p>
          </div>
          <div className="footer-column">
            <h3 className="footer-column-title">SERVICE BOOKING</h3>
            <nav className="footer-links">
              <a href="#services">Transport</a>
              <a href="#services">Warehousing</a>
              <a href="#services">Export & Import</a>
              <a href="#services">All categories</a>
            </nav>
          </div>
          <div className="footer-column">
            <h3 className="footer-column-title">BOS</h3>
            <nav className="footer-links">
              <a href="#bos">Transport BOS</a>
              <a href="#bos">Warehouse BOS</a>
              <a href="#bos">Accounting & HRMS</a>
              <a href="#bos">All BOS solutions</a>
            </nav>
          </div>
          <div className="footer-column">
            <h3 className="footer-column-title">COMPANY</h3>
            <nav className="footer-links">
              <a href="#about">About</a>
              <a href="#support">Support</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-container container">
            <span className="footer-copyright">
              © 2026 Jr Pixelz Pvt Limited. All rights reserved.
            </span>
            <span className="footer-version">
              TRANZOOP · BUSINESS OPERATING SYSTEM
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
