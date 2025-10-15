import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSun,FiMoon,FiX, FiLogOut } from "react-icons/fi";
import { useTheme } from "../../ThemeContext";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const [animating, setAnimating] = useState(false);

  const closeSidebar = () => onClose();

  const handleThemeToggle = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 350);
    toggleTheme();
  };

  return (
    <>
      {/* Dark Overlay */}
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-top-row">
          {/* Theme toggle button (now on the left) */}
          <button
            className={`theme-toggle-btn${animating ? " animating" : ""}`}
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            <span className={`theme-icon${theme === "light" ? " sun" : " moon"}`}>
              {theme === "light" ? <FiSun/> : <FiMoon/>}
            </span>
          </button>
          {/* Close button (now on the right) */}
          <button className="close-btn" onClick={closeSidebar}>
            <FiX size={24} />
          </button>
        </div>

        {/* Header (Top) */}
        <div className="sidebar-header">
          <div className="avatar"></div>
          <h3 className="username">Guest</h3>
          <Link to="/login" className="login-btn" onClick={closeSidebar}>
            Login
          </Link>
        </div>

        {/* Middle Area (Navigation) */}
        <nav className="sidebar-nav">
          <Link to="/" onClick={closeSidebar}>Home</Link>
          <Link to="/collection" onClick={closeSidebar}>Collection</Link>
          <Link to="/men" onClick={closeSidebar}>Men</Link>
          <Link to="/women" onClick={closeSidebar}>Women</Link>
          <Link to="/kids" onClick={closeSidebar}>Kids</Link>
          <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
        </nav>

        {/* Bottom Area (Footer) */}
        <div className="sidebar-bottom">
          {/* "Settings" button has been removed */}
          <button className="bottom-btn">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;