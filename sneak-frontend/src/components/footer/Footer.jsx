import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaArrowRight } from "react-icons/fa"; // Modern icon set
import "./Footer.css";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (section) => {
    // Only toggle on mobile (handled via CSS display checks usually, but logic here is fine)
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="site-footer">
      {/* 1. Newsletter Section */}
      <div className="footer-top">
        <div className="newsletter-content">
          <h2>Don't Miss the Drop</h2>
          <p>Sign up for updates on exclusive releases and early access.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-divider" />

      {/* 2. Main Footer Grid */}
      <div className="footer-content">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <h3 className="brand-logo">Syed_Sneakers</h3>
          <p className="brand-desc">
            The premier destination for authentic sneakers and streetwear. 
            Verified authenticity. Global shipping.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Links Column: Shop */}
        <div className="footer-links-col">
          <button 
            className="mobile-toggle" 
            onClick={() => toggleSection("shop")}
          >
            Shop <span className={`chevron ${openSection === "shop" ? "rotate" : ""}`}>▼</span>
          </button>
          <ul className={`footer-menu ${openSection === "shop" ? "open" : ""}`}>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/collection">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Links Column: Support */}
        <div className="footer-links-col">
          <button 
            className="mobile-toggle" 
            onClick={() => toggleSection("support")}
          >
            Support <span className={`chevron ${openSection === "support" ? "rotate" : ""}`}>▼</span>
          </button>
          <ul className={`footer-menu ${openSection === "support" ? "open" : ""}`}>
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Returns & Exchanges</Link></li>
            <li><Link to="#">Shipping Info</Link></li>
            <li><Link to="#">Size Guide</Link></li>
          </ul>
        </div>

        {/* Links Column: Company */}
        <div className="footer-links-col">
          <button 
            className="mobile-toggle" 
            onClick={() => toggleSection("company")}
          >
            Company <span className={`chevron ${openSection === "company" ? "rotate" : ""}`}>▼</span>
          </button>
          <ul className={`footer-menu ${openSection === "company" ? "open" : ""}`}>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Syed Sneakers. All rights reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      <button
        className={`floating-top-btn ${showScrollTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}