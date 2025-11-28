import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiX, FiLogOut, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useTheme } from "../../ThemeContext";
import "./Sidebar.css";
import { closeSidebar } from "../../features/ui/uiSlice";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get UI state and Auth state from Redux
  const isOpen = useSelector((state) => state.ui.isSidebarOpen);

  const handleClose = () => dispatch(closeSidebar());


  return (
    <>
      {/* Dark Overlay */}
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={handleClose}></div>

      {/* Sidebar Content */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {/* --- 1. Header & Close --- */}
        <div className="sidebar-header-row">
          <span className="sidebar-title">Menu</span>
          <button className="close-btn" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>


        {/* --- 3. Navigation Links --- */}
        <nav className="sidebar-nav">
          <Link to="/" onClick={handleClose} className="sidebar-link">Home</Link>
          <Link to="/collection" onClick={handleClose} className="sidebar-link">Collection</Link>
          <div className="category-group">
            <Link to="/men" onClick={handleClose} className="sidebar-link sub-link">Men</Link>
            <Link to="/women" onClick={handleClose} className="sidebar-link sub-link">Women</Link>
            <Link to="/kids" onClick={handleClose} className="sidebar-link sub-link">Kids</Link>
          </div>
        </nav>

        {/* --- 4. Footer (Theme & Logout) --- */}
        <div className="sidebar-footer">
          <button className="sidebar-footer-btn theme-btn" onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        
        </div>

      </aside>
    </>
  );
}