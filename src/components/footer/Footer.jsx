import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
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
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Syed Sneakers</h2>
          <p>© 2025 Syed Sneakers. All rights reserved.</p>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => toggleSection("shop")}>Shop <span className={`footer-chevron ${openSection === "shop" ? "rotate" : ""}`}>▼</span></button>
          <ul className={openSection === "shop" ? "open" : ""}>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/collection">All Products</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <button onClick={() => toggleSection("support")}>Support <span className={`footer-chevron ${openSection === "support" ? "rotate" : ""}`}>▼</span></button>
          <ul className={openSection === "support" ? "open" : ""}>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
      </div>

      {showScrollTop && (
        <button
          className="floating-top-btn show"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Top
        </button>
      )}
    </footer>
  );
}
