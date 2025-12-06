import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiX, FiHome, FiGrid, FiUser, FiShoppingBag, FiHeart, FiLogOut } from "react-icons/fi";
import "./Sidebar.css";
import { closeSidebar, toggleProfileModal } from "../../features/ui/uiSlice";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get UI state from Redux
  const isOpen = useSelector((state) => state.ui.isSidebarOpen);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleClose = () => dispatch(closeSidebar());

  const handleProfileClick = () => {
    dispatch(closeSidebar());
    dispatch(toggleProfileModal());
  };

  return (
    <>
      {/* Dark Overlay */}
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={handleClose}></div>

      {/* Sidebar Content */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* --- Header --- */}
        <div className="sidebar-header">
          <h2 className="brand-logo">Sparks</h2>
          <button className="close-btn" onClick={handleClose}>
            <FiX />
          </button>
        </div>

        {/* --- Navigation --- */}
        <nav className="sidebar-nav">
          <Link to="/" onClick={handleClose} className="nav-item">
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/collection" onClick={handleClose} className="nav-item">
            <FiGrid className="nav-icon" />
            <span>Collection</span>
          </Link>

          <div className="nav-divider"></div>
          <span className="nav-label">Categories</span>

          <Link to="/men" onClick={handleClose} className="nav-item sub-item">
            <span>Men</span>
          </Link>
          <Link to="/women" onClick={handleClose} className="nav-item sub-item">
            <span>Women</span>
          </Link>
          <Link to="/kids" onClick={handleClose} className="nav-item sub-item">
            <span>Kids</span>
          </Link>

          <div className="nav-divider"></div>
          <span className="nav-label">Account</span>

          <Link to="/dashboard" onClick={handleClose} className="nav-item">
            <FiShoppingBag className="nav-icon" />
            <span>Cart</span>
            {cartCount > 0 && <span className="sidebar-badge">{cartCount}</span>}
          </Link>
          <Link to="/wishlist" onClick={handleClose} className="nav-item">
            <FiHeart className="nav-icon" />
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="sidebar-badge">{wishlistCount}</span>}
          </Link>
        </nav>

        {/* --- User Profile Section --- */}
        <div className="sidebar-profile-section" onClick={handleProfileClick}>
          {user ? (
            <>
              {user.avatar ? (
                <img src={`${API_BASE_URL}${user.avatar}`} alt="User" className="sidebar-avatar" />
              ) : (
                <div className="sidebar-avatar-placeholder"><FiUser /></div>
              )}
              <div className="sidebar-user-info">
                <span className="sidebar-username">{user.name}</span>
                <span className="sidebar-user-action">View Profile</span>
              </div>
            </>
          ) : (
            <div className="sidebar-login-prompt">
              <div className="sidebar-avatar-placeholder"><FiUser /></div>
              <div className="sidebar-user-info">
                <span className="sidebar-username">Guest</span>
                <span className="sidebar-user-action">Login / Register</span>
              </div>
            </div>
          )}
        </div>

      </aside>
    </>
  );
}