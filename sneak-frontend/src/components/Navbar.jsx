import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import { toggleShoppingPanel, toggleSidebar, toggleProfileModal } from "../features/ui/uiSlice";
import "./Navbar.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function Navbar() {
  const dispatch = useDispatch();
  
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="navbar">
      {/* --- LEFT: Logo & Brand --- */}
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <div className="logo-placeholder"></div>
          {/* This text will be hidden on mobile via CSS */}
          <span className="brand-title">Syed_Sneakers</span>
        </Link>
      </div>

      {/* --- CENTER: Navigation Links (Desktop Only) --- */}
      <nav className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/collection" className="nav-link">Collection</Link>
        <Link to="/men" className="nav-link">Men</Link>
        <Link to="/women" className="nav-link">Women</Link>
        <Link to="/kids" className="nav-link">Kids</Link>
      </nav>

      {/* --- RIGHT: Action Icons --- */}
      <div className="navbar-right">
        
        {/* Wishlist Icon - Visible on Mobile now */}
        <Link 
          to="/wishlist" 
          className="icon-btn" 
          title="Wishlist"
        >
          <FiHeart size={22} />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        {/* Cart Icon */}
        <Link 
          to="/dashboard" 
          className="icon-btn" 
          title="Cart"
        >
          <FiShoppingCart size={22} />
          {/* Re-adding the notifier badge here */}
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {/* User Icon - Opens Sidebar/Profile */}
        <button 
          className="icon-btn user-btn" 
          onClick={() => dispatch(toggleProfileModal())}
          title="Profile"
        >
          {user && user.avatar ? (
            <img 
              src={`${API_BASE_URL}${user.avatar}`} 
              alt="User" 
              className="nav-avatar"
            />
          ) : (
            <FiUser size={22} />
          )}
        </button>

        {/* Hamburger Menu - Mobile Only */}
        <button className="icon-btn mobile-menu-btn" onClick={() => dispatch(toggleSidebar())}>
          <FiMenu size={24} />
        </button>
      </div>
    </header>
  );
}